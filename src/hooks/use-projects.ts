import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./use-http";

export const useProjects = (param?: Partial<Project>) => {
  const clients = useHttp();
  const { execute, ...result } = useAsync<Project[]>();

  const fetchProject = () =>
    clients("projects", { data: cleanObject(param || {}) });

  useEffect(() => {
    execute(fetchProject(), {
      reload: fetchProject,
    });
    // eslint-disable-next-line
  }, [param]);

  return result;
};
