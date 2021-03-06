import { useAsync } from "./use-async";
import { useHttp } from "./use-http";
import { Project } from "screens/project-list/list";
import { QueryKey, useMutation, useQueryClient } from "react-query";
import { useAddConfig } from "./use-optimistic-options";

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  // const queryClient = useQueryClient();
  return useMutation(
    (param: Partial<Project>) =>
      client(`projects`, {
        data: param,
        method: "POST",
      }),
    /*{
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }*/
    useAddConfig(queryKey)
  );
};
