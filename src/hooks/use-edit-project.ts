import { useAsync } from "./index";
import { useHttp } from "./use-http";
import { Project } from "../screens/project-list/list";

export const useEditProject = () => {
  const { execute, ...asyncRes } = useAsync();
  const client = useHttp();
  const mutate = (param: Partial<Project>) => {
    return execute(
      client(`projects/${param.id}`, {
        data: param,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...asyncRes,
  };
};
