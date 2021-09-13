import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "./use-mounted-ref";

interface State<T> {
  error: Error | null;
  data: T | null;
  status: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

const useSaftDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (state: State<T>, action: Partial<State<T>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );

  // import useMountedRef to deal with mounted component state
  const safeDispatch = useSaftDispatch(dispatch);

  // remember the previous promise
  // initialState is function: lazy initiate, 因此不能直接传入函数，需要额外保存
  const [reload, setReload] = useState(() => () => {});
  const setData = useCallback(
    (data: T) =>
      safeDispatch({
        data,
        status: "success",
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        status: "error",
        data: null,
      }),
    [safeDispatch]
  );

  // trigger the async callback
  const execute = useCallback(
    (promise: Promise<T>, executeConfig?: { reload: () => Promise<T> }) => {
      if (!promise || !promise.then()) {
        throw new Error("use Promise type");
      }
      // lazy function
      setReload(() => () => {
        if (executeConfig?.reload) {
          execute(executeConfig.reload(), executeConfig);
        }
      });
      // using prevState to prevent the loop render
      safeDispatch({ status: "loading" });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          // catch can capture the error, and the outside cannot get the error
          setError(error);
          if (config.throwOnError) {
            console.log("true..............");
            return Promise.reject(error);
          } else {
            // return error;
            return Promise.reject(error);
          }
          // return  error;
          //  so we need throw Promise
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    execute,
    setData,
    setError,
    // reload can trigger the execute and refresh the state
    reload,
    ...state,
  };
};
