import React from "react";
import { Button, Drawer } from "antd";

export const PreProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      width={"100%"}
      visible={props.projectModalOpen}
    >
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}>Close</Button>
    </Drawer>
  );
};
