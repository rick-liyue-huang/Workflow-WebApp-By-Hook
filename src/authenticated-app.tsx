import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "./context/auth-context";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <ProjectListScreen />
      <button onClick={logout}>Logout</button>
    </div>
  );
};
