import { QueryKey, useQueryClient } from "react-query";
import { Project } from "../screens/project-list/list";
import { useProjectSearchParams } from "../screens/project-list/utils";

export const useOptimisticOptions = (
  queryKey: QueryKey,
  callback: (target: any, prev?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // optimistic update
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      // console.log('previousItems', previousItems);
      queryClient.setQueryData(queryKey, (prev?: any[]) => {
        // return prev?.map(project => project.id === target.id ? {...project, ...target} : project) || []
        return callback(target, prev);
      });
      return { previousItems };
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(
        queryKey,
        (context as { previousItems: Project[] }).previousItems
      );
    },
  };
};

export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ["projects", params];
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useOptimisticOptions(
    queryKey,
    (target, prev) => prev?.filter((item) => item.id !== target.id) || []
  );
export const useEditConfig = (queryKey: QueryKey) =>
  useOptimisticOptions(
    queryKey,
    (target, prev) =>
      prev?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );
export const useAddConfig = (queryKey: QueryKey) =>
  useOptimisticOptions(queryKey, (target, prev) =>
    prev ? [...prev, target] : []
  );
