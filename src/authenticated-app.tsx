import React, { useState } from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { NoPaddingButton, Row } from "./components/lib";
// import {ReactComponent as SoftLogo} from 'assets/software-logo.svg';
import logo from "assets/workflow.svg";
import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/one-project";
import { resetRouter } from "./utils";
import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectPopover } from "./components/project-popover";
// import { User } from "./screens/project-list/search-panel";

export const AuthenticatedApp = () => {
  //Lifting State Up to deal with opening one 'editProject' page
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader
        /*  component composition can use to decompose the set method, */
        projectButton={
          <NoPaddingButton
            type={"link"}
            onClick={() => setProjectModalOpen(true)}
          >
            Create Project
          </NoPaddingButton>
        }
      />
      {/*<Button onClick={() => setProjectModalOpen(true)}>test</Button>*/}
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen
                  // setProjectModalOpen={setProjectModalOpen}
                  projectButton={
                    <NoPaddingButton
                      type={"link"}
                      onClick={() => setProjectModalOpen(true)}
                    >
                      Create Project
                    </NoPaddingButton>
                  }
                />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={"/projects"} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: {
  // setProjectModalOpen: (isOpen: boolean) => void;
  projectButton: JSX.Element;
}) => {
  return (
    <Header>
      <HeaderLeft gap={true} between={true}>
        <NoPaddingButton type={"link"} onClick={resetRouter}>
          <img src={logo} alt="" />
        </NoPaddingButton>
        {/*<SoftLogo width={"18rem"} color={"rgb(38, 132, 255)"} />*/}
        {/*<ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />*/}
        <ProjectPopover {...props} />
        <span>Account</span>
      </HeaderLeft>
      <HeaderRight>
        <UserComponent />
      </HeaderRight>
    </Header>
  );
};

const UserComponent = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"} onClick={logout}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "main main main"
    "footer footer footer";
  height: 100vh;
  grid-gap: 2rem;
`;
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main`
  grid-area: main;
`;
/*const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;*/
