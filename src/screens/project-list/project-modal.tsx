import React from "react";
import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListAction,
  selectProjectModalOpen,
} from "./project-list.slice";

export const ProjectModal = () => {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  return (
    <Drawer
      onClose={() => dispatch(projectListAction.closeProjectModal())}
      width={"100%"}
      visible={projectModalOpen}
    >
      <h1>Project Modal</h1>
      <Button onClick={() => dispatch(projectListAction.closeProjectModal())}>
        Close
      </Button>
    </Drawer>
  );
};
