import React, { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "./index";

export const LoginScreen = () => {
  const { login } = useAuth();

  const handleSubmit = (param: { username: string; password: string }) => {
    login(param);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "need username" }]}
      >
        <Input
          placeholder={"please input username"}
          type="text"
          id={"username"}
        />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "need password" }]}
      >
        <Input
          placeholder={"please input password"}
          type="text"
          id={"password"}
        />
      </Form.Item>
      <Form.Item>
        <LongButton type={"primary"} htmlType={"submit"}>
          Login
        </LongButton>
      </Form.Item>
    </Form>
  );
};

/*
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
* */
