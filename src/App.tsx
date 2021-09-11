import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageError } from "components/lib";

const App = () => {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <AuthenticatedApp user={user} /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
};

export default App;
