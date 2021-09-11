import React, { useState } from "react";
import { Card, Typography } from "antd";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import styled from "@emotion/styled";
import { Divider, Button } from "antd";
// import { Helmet } from "react-helmet";
import { useDocumentTitle } from "hooks";
// import logo from "assets/workflow.svg";
// import left from "assets/left.svg";
// import right from "assets/right.svg";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { Title } = Typography;
  useDocumentTitle("Please Register or Login");
  return (
    <Container>
      {/*<Helmet>
        <title>Please Login or Register</title>
      </Helmet>*/}
      <Header />
      <Title level={3} style={{ color: "#1DA57A" }}>
        WorkFlow App
      </Title>
      <Background />
      {/*<Button onClick={() => {
        throw new Error('click exception')
      }}>exception</Button>*/}
      <NewCard>
        <NewTitle>{isRegister ? "Please Register" : "Please Login"}</NewTitle>
        {error ? (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null}
        {isRegister ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        <Divider />
        <Button
          type={"link"}
          onClick={() => {
            setIsRegister(!isRegister);
            setError(null);
          }}
        >
          {isRegister ? "Have an account? Login" : "New guest? Register"}
        </Button>
      </NewCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const NewCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Header = styled.div`
  background: url("https://kissflow.com/wp-content/themes/kissflow_website/assets/images/homeicons/kflogo_icon.svg")
    no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url("https://kissflow.com/static/kf_images/procurement-software.svg"),
    url("https://kissflow.com/wp-content/uploads/2021/08/fully-managed-community-platform.png");
`;

const NewTitle = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

export const LongButton = styled(Button)`
  width: 100%;
`;
