import { useUrlQueryParam } from "../../hooks/use-url-query-param";
import { useMemo } from "react";

// 项目列表的搜索 参数
export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  // to match the project type with urlSearchParam
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};
