import React from "react";
import { ProjectListScreens } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Button } from "antd";
import { Row } from "./components/lib";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft gap={true} between={true}>
          <h2>Logo</h2>
          <h2>Project</h2>
          <h2>Account</h2>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={logout}>Logout</Button>
        </HeaderRight>
      </Header>
      {/*<Nav>nav</Nav>*/}
      <Main>
        <ProjectListScreens />
      </Main>
      {/*<Aside>aside</Aside>*/}
      {/*<Footer>footer</Footer>*/}
    </Container>
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
