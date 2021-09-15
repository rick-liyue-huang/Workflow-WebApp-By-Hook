import { useAsync } from "./use-async";
import { useHttp } from "./use-http";
import { Project } from "screens/project-list/list";
import { QueryKey, useMutation, useQueryClient } from "react-query";
import { useDeleteConfig } from "./use-optimistic-options";

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  // const queryClient = useQueryClient();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    /*{
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }*/
    useDeleteConfig(queryKey)
  );
};
