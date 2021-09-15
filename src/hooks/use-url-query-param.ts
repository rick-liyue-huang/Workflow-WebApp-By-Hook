import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "../utils";
import { useSetUrlSearchParam } from "./index";

export const useUrlQueryParam = <T extends string>(keys: T[]) => {
  const [searchParams /*setSearchParam*/] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in T]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in T]: unknown }>) => {
      /*const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);*/
      return setSearchParams(params);
    },
  ] as const;
};
