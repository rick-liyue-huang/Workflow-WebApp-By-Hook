import React from "react";
export const List = ({ list, setList, users }) => {
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
