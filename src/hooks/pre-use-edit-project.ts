import { useAsync } from "./index";
import { useHttp } from "./use-http";
import { Project } from "../screens/project-list/list";
import { useMutation, useQueryClient } from "react-query";

export const usePreuseEditProject = () => {
  const client = useHttp();
  const { execute, ...asyncRes } = useAsync();

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
