import React from "react";
import "./App.css";
import { ProjectListScreens } from "./screens/project-list";
import { LoginScreen } from "./screens/login";

function App() {
  return (
    <div className="App">
      {/*<ProjectListScreens />*/}
      <LoginScreen />
    </div>
  );
}

export default App;
