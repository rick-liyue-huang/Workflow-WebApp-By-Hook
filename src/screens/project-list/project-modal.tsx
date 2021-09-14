import React from "react";
import { Button, Drawer } from "antd";
import { useProjectModal } from "../../hooks";

export const ProjectModal = () => {
  const { projectModalOpen, open, close } = useProjectModal();
  return (
    <Drawer onClose={close} width={"100%"} visible={projectModalOpen}>
      <h1>Project Modal</h1>
      <Button onClick={close}>Close</Button>
    </Drawer>
  );
};
