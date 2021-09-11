import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { GroupScreen } from "../group";
import { DashboardScreen } from "../dashboard";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"dashboard"}>Dashboard</Link>
      <Link to={"group"}>Project Group</Link>
      <Routes>
        <Route path={"/dashboard"} element={<DashboardScreen />} />
        <Route path={"/group"} element={<GroupScreen />} />
        <Navigate to={window.location.pathname + "/dashboard"} />
      </Routes>
    </div>
  );
};
