import { useState } from "react";

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

export const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initialConfig };
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  });
  const setData = (data: T) =>
    setState({
      data,
      status: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      error,
      status: "error",
      data: null,
    });

  // trigger the async callback
  const execute = (promise: Promise<T>) => {
    if (!promise || !promise.then()) {
      throw new Error("use Promise type");
    }
    setState({ ...state, status: "loading" });
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
  };

  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    execute,
    setData,
    setError,
    ...state,
  };
};
