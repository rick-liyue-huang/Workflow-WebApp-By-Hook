import React from "react";
import { ProjectListScreens } from "./screens/project-list";
import { useAuth } from "./context/auth-context";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <>
      <ProjectListScreens />
      <button onClick={logout}>Logout</button>
    </>
  );
};
