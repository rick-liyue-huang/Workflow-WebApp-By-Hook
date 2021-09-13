import React from "react";
import { Popover, Typography, List, Divider, Button } from "antd";
import { useProjects } from "../hooks";
import styled from "@emotion/styled";
import { NoPaddingButton } from "./lib";

export const ProjectPopover = (props: {
  // setProjectModalOpen: (isOpen: boolean) => void;
  projectButton: JSX.Element;
}) => {
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>Collected Project</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      {/*<NoPaddingButton
        type={"link"}
        onClick={() => props.setProjectModalOpen(true)}
      >
        Create Project
      </NoPaddingButton>*/}
      {props.projectButton}
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>Project</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
