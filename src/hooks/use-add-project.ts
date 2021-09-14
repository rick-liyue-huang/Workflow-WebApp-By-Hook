import { useAsync } from "./use-async";
import { useHttp } from "./use-http";
import { Project } from "screens/project-list/list";
import { useMutation, useQueryClient } from "react-query";

export const useAddProject = () => {
  const client = useHttp();

  const queryClient = useQueryClient();
  return useMutation(
    (param: Partial<Project>) =>
      client(`projects`, {
        data: param,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
