import { User } from "screens/project-list/search-panel";
import { useHttp } from "./use-http";
import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils";

export const useUsers = (param?: Partial<User>) => {
  const clients = useHttp();
  const { execute, ...result } = useAsync<User[]>();

  useEffect(() => {
    execute(clients("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line
  }, [param]);

  return result;
};
