import React from "react";
import { Popover, Typography, List, Divider, Button } from "antd";
import { useProjects } from "../hooks";
import styled from "@emotion/styled";
import { NoPaddingButton } from "./lib";
import { useDispatch } from "react-redux";
import { projectListAction } from "screens/project-list/project-list.slice";

export const ProjectPopover = () => {
  const dispatch = useDispatch();
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
      <NoPaddingButton
        type={"link"}
        onClick={() => dispatch(projectListAction.openProjectModal())}
      >
        Create Project
      </NoPaddingButton>
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
