import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../hooks/use-async";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { execute, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    cpassword,
    ...param
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== param.password) {
      onError(new Error("please match the twice passwords"));
      return;
    }
    try {
      await execute(register(param));
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
      <Form.Item
        name={"confirm-password"}
        rules={[{ required: true, message: "need confirm password" }]}
      >
        <Input
          placeholder={"please confirm password"}
          type="text"
          id={"confirm-password"}
        />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          Register
        </LongButton>
      </Form.Item>
    </Form>
  );
};
