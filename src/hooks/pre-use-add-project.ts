import { useAsync } from "./use-async";
import { useHttp } from "./use-http";
import { Project } from "screens/project-list/list";

export const usePreUseAddProject = () => {
  const { execute, ...asyncRes } = useAsync();
  const client = useHttp();
  const mutate = (param: Partial<Project>) => {
    return execute(
      client(`projects/${param.id}`, {
        data: param,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...asyncRes,
  };
};
