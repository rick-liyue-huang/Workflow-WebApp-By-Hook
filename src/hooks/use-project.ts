// get project detail
import { useHttp } from "./use-http";
import { useQuery } from "react-query";
import { Project } from "../screens/project-list/list";

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      // id is true to trigger useQuery
      enabled: Boolean(id),
    }
  );
};
