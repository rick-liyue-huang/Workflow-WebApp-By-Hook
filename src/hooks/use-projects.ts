import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./use-http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { execute, ...result } = useAsync<Project[]>();

  const fetchProject = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );

  useEffect(() => {
    execute(fetchProject(), {
      reload: fetchProject,
    });
  }, [param, execute, fetchProject]);

  return result;
};
