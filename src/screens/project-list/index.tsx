import React, { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce } from "hooks/use-debounce";

import styled from "@emotion/styled";
import { Typography } from "antd";
// import {useAsync} from 'hooks/use-async';
import { useProjects } from "../../hooks/use-projects";
import { useUsers } from "../../hooks/use-users";

export const ApiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreens = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // const [users, setUsers] = useState([]);
  // const [list, setList] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);
  const debouncedParam = useDebounce(param, 2000);
  // const clients = useHttp();
  /*const {execute, isLoading, error, data: list} = useAsync<Project[]>();

  useEffect(() => {
    execute(clients("projects", { data: cleanObject(debouncedParam) }))
    // eslint-disable-next-line
  }, [debouncedParam]);*/

  const { isLoading, error, data: list } = useProjects(debouncedParam);

  /*useMount(() => {
    clients("users").then(setUsers);
  });*/

  const { data: users } = useUsers();
  return (
    <Container>
      <h1>Project List</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      {/*<List list={list} users={users} />*/}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

/*
  useEffect(() => {
    fetch(
      `${ApiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);
* */

/*
  useEffect(() => {
    fetch(`${ApiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);
* */

/*
  setLoading(true);
    clients("projects", { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch(error  => {
        setError(error);
        setList([]);
      })
      .finally(() => setLoading(false))
* */
