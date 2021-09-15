import { useAsync } from "./index";
import { useHttp } from "./use-http";
import { Project } from "../screens/project-list/list";
import { QueryKey, useMutation, useQueryClient } from "react-query";
// import {useProjectSearchParams} from '../screens/project-list/utils';
import { useEditConfig } from "./use-optimistic-options";

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, {
        data: param,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

/*export const useEditProject = () => {
  const client = useHttp();

  const [searchParams] = useProjectSearchParams();
  const queryClient = useQueryClient();
  const queryKey = ['projects', searchParams];
  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, {
        data: param,
        method: "PATCH",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      // optimistic update
      // async onMutate(target) {
      //
      //   const previousItems = queryClient.getQueryData(queryKey);
      //   // console.log('previousItems', previousItems);
      //   queryClient.setQueryData(queryKey, (prev?: Project[]) => {
      //     return prev?.map(project => project.id === target.id ? {...project, ...target} : project) || []
      //   });
      //   return {previousItems};
      // },
      // onError(error, newItem, context) {
      //   queryClient.setQueryData(queryKey, (context as {previousItems: Project[]}).previousItems)
      // }
    }
  );
};*/
