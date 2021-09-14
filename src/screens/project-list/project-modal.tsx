import React, { useEffect } from "react";
import { Button, Drawer, Spin, Form, Input } from "antd";
import { useAddProject, useEditProject, useProjectModal } from "hooks";
import { UserSelect } from "../../components/user-select";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "../../components/lib";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();

  // refresh the form
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const title = editingProject ? "Edit Project" : "Create Project";

  // reset on editing form
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={close}
      width={"100%"}
      visible={projectModalOpen}
    >
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout={"vertical"}
            style={{ width: "40rem" }}
            onFinish={onFinish}
          >
            <Form.Item
              label={"Name"}
              name={"name"}
              rules={[{ required: true, message: "please input project name" }]}
            >
              <Input placeholder={"please input project name"} />
            </Form.Item>
            <Form.Item
              label={"Department"}
              name={"organization"}
              rules={[
                { required: true, message: "please input department name" },
              ]}
            >
              <Input placeholder={"please input department name"} />
            </Form.Item>
            <Form.Item label={"Person In Charge"} name={"personId"}>
              <UserSelect defaultOptionName={"Person In Charge"} />
            </Form.Item>
            <Form.Item>
              <Button
                loading={mutateLoading}
                type={"primary"}
                htmlType={"submit"}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      {/*<h1>Project Modal</h1>
      <Button onClick={close}>Close</Button>*/}
    </Drawer>
  );
};
