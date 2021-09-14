import { useAsync } from "./index";
import { useHttp } from "./use-http";
import { Project } from "../screens/project-list/list";
import { useMutation, useQueryClient } from "react-query";

export const useEditProject = () => {
  const client = useHttp();

  const queryClient = useQueryClient();
  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, {
        data: param,
        method: "PATCH",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
