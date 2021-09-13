import React from "react";
import { Form, Input } from "antd";
import { useNewAuth } from "context/auth-context-redux";
import { LongButton } from "./index";
import { useAsync } from "hooks";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useNewAuth();
  const { execute, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (param: {
    username: string;
    password: string;
  }) => {
    try {
      // await login(param);
      await execute(login(param));
    } catch (e: any) {
      onError(e);
    }
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
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
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
