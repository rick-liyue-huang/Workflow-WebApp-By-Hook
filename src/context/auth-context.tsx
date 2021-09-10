import React, { ReactNode, useState } from "react";
import * as auth from "auth-providers";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "hooks/use-mount";
import { useAsync } from "hooks/use-async";
import { FullPageError, FullPageLoading } from "../components/lib";

interface AuthForm {
  username: string;
  password: string;
}

const initiateUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    error,
    isLoading,
    isError,
    isIdle,
    execute,
    setData: setUser,
  } = useAsync<User | null>();
  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    // initiateUser().then(setUser);
    execute(initiateUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("must use auth in AuthProvider");
  }
  return context;
};
