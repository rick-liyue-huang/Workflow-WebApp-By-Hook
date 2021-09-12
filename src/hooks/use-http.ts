import { useAuth } from "../context/auth-context";
import { http } from "utils/http";
import { useCallback } from "react";

export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
