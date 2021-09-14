import React, { useState } from "react";
import { SearchPanel } from "./search-panel";
import { PreList } from "./pre-list";
import { useDebounce } from "hooks";
import styled from "@emotion/styled";
import { Typography, Button } from "antd";
import { useProjects, useUsers, useDocumentTitle } from "hooks";
import { useUrlQueryParam } from "../../hooks/use-url-query-param";
import { useProjectSearchParams } from "./utils";
import { Row } from "components/lib";
// import { Helmet } from "react-helmet";

export const ApiUrl = process.env.REACT_APP_API_URL;

export const PreProjectListScreen = (props: {
  // setProjectModalOpen: (isOpen: boolean) => void;
  projectButton: JSX.Element;
}) => {
  /* const [, setParam] = useState({
    name: "",
    personId: "",
  });*/
  /*const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  // to match the project type with urlSearchParam
  const projectParam = {...param, personId: Number(param.personId) || undefined}*/
  const [param, setParam] = useProjectSearchParams();

  // const [users, setUsers] = useState([]);
  // const [list, setList] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);
  // const debouncedParam = useDebounce(param, 2000);
  const debouncedParam = useDebounce(param, 2000);
  useDocumentTitle("Project List", false);
  // const clients = useHttp();
  /*const {execute, isLoading, error, data: list} = useAsync<Project[]>();
  useEffect(() => {
    execute(clients("projects", { data: cleanObject(debouncedParam) }))
    // eslint-disable-next-line
  }, [debouncedParam]);*/

  const { isLoading, error, data: list, reload } = useProjects(debouncedParam);
  /*useMount(() => {
    clients("users").then(setUsers);
  });*/

  const { data: users } = useUsers();
  useUrlQueryParam(["random"]);
  return (
    <Container>
      {/*<Helmet>
        <title>Project List</title>
      </Helmet>*/}
      <Row between={true}>
        <h1>Project List</h1>
        {/*<Button onClick={() => props.setProjectModalOpen(true)}>
          Create Project
        </Button>*/}
        {props.projectButton}
      </Row>

      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      {/*<List list={list} users={users} />*/}
      <PreList
        reload={reload}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
        // setProjectModalOpen={props.setProjectModalOpen}
        projectButton={props.projectButton}
      />
    </Container>
  );
};

PreProjectListScreen.whyDidYouRender = true;

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
