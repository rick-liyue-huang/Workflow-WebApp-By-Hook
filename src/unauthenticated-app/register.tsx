import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";

export const RegisterScreen = () => {
  const { register } = useAuth();
  const handleSubmit = (param: { username: string; password: string }) => {
    register(param);
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
          Register
        </LongButton>
      </Form.Item>
    </Form>
  );
};
