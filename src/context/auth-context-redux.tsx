import React, { ReactNode, useCallback, useState } from "react";
import * as auth from "auth-providers";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "hooks/use-mount";
import { useAsync } from "hooks/use-async";
import { FullPageError, FullPageLoading } from "../components/lib";
import { useDispatch, useSelector } from "react-redux";
import * as authStore from "unauthenticated-app/auth.slice";

export interface AuthForm {
  username: string;
  password: string;
}

export const initiateUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    error,
    isLoading,
    isError,
    isIdle,
    execute,
    setData: setUser,
  } = useAsync<User | null>();

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  useMount(() => {
    // initiateUser().then(setUser);
    execute(dispatch(authStore.initial()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }

  return <div>{children}</div>;
};

export const useNewAuth = () => {
  // 显式的确认返回 Promise
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.loginThunk(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.registerThunk(form)),
    [dispatch]
  );
  const logout = useCallback(
    () => dispatch(authStore.logoutThunk()),
    [dispatch]
  );

  return {
    user,
    login,
    register,
    logout,
  };
};
