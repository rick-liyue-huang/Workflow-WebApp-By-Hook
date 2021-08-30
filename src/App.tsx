import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectListScreen } from "./screens/project-list";
import { LoginScreen } from "screens/login/inded";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnAuthenticatedApp } from "./unauthenticated-app/index";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      {/* <LoginScreen /> */}
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </div>
  );
}

export default App;
