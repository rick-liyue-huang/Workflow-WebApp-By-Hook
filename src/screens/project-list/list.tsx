import React from "react";
import { Table, TableProps, Rate, Dropdown, Menu, Modal } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject, useProjectModal } from "hooks";
import { NoPaddingButton } from "../../components/lib";
import { useProject } from "../../hooks/use-project";
import { useProjectQueryKey } from "../../hooks/use-optimistic-options";
import { useDeleteProject } from "../../hooks/use-delete-project";

// personId changed to number type
export interface Project {
  id: number;
  personId: number;
  name: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  // list: Project[];
  users: User[];
  // reload?: () => void;
  // setProjectModalOpen: (isOpen: boolean) => void;
  // projectButton: JSX.Element;
}

export const List: React.FC<ListProps> = ({ users, /*list*/ ...props }) => {
  // hooks must use on top level, so I encap it on another hooks
  const { mutate } = useEditProject(useProjectQueryKey());

  // 科里化, 因为  id 是 先 发现的，然后是 pin 后来知道的，因此需要先处理前面的后处理后面。这就是科里化
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }); /*.then(props.reload)*/

  // const { open } = useProjectModal();

  return (
    <Table
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "Project Name",
          // dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "Department",
          dataIndex: "organization",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "Person In Charge",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "unknown"}
              </span>
            );
          },
        },
        {
          title: "Created Time",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("DD/MM/YYYY")
                  : "none"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <DropMore project={project} />;
          },
        },
      ]}
      // dataSource={list}
      {...props}
    />
  );
};

const DropMore = ({ project }: { project: Project }) => {
  // use project-modal
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());
  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "Confirm delete project?",
      content: "Click to confirm",
      okText: "Confirm",
      onOk() {
        deleteProject({ id });
      },
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={editProject(project.id)} key={"edit"}>
            Edit
          </Menu.Item>
          <Menu.Item onClick={() => confirmDelete(project.id)} key={"delete"}>
            Delete
          </Menu.Item>
        </Menu>
      }
    >
      <NoPaddingButton type={"link"}>...</NoPaddingButton>
    </Dropdown>
  );
};

/*
  <table>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Person In Charge</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "unknown"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
* */
