import React from "react";
import { User } from "./search-panel";

export interface Project {
  id: string;
  personId: string;
  name: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List: React.FC<ListProps> = ({ users, list }) => {
  return (
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
  );
};
