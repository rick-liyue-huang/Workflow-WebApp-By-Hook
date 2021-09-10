import { useState } from "react";

interface State<T> {
  error: Error | null;
  data: T | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
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
      stat: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  // trigger the async callback
  const execute = (promise: Promise<T>) => {
    if (!promise || !promise.then()) {
      throw new Error("use Promise type");
    }
    setState({ ...state, stat: "loading" });
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
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    execute,
    setData,
    setError,
    ...state,
  };
};
