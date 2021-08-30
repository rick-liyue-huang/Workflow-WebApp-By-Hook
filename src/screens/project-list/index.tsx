import React, { useEffect, useState } from "react";
import qs from "qs";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { useHttp } from "../../utils/http";

export const ApiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 1000);

  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel users={users} setParam={setParam} param={param} />
      <List list={list} users={users} />
    </div>
  );
};

/*
  useEffect(() => {
    fetch(`${ApiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);
* */

/**
  useEffect(() => {
    client('projects', {data: cleanObject(debouncedParam)}).then(setList);
    
    fetch(
      `${ApiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);

 */

/**
   useMount(() => {
    client('users').then(setUsers);
    fetch(`${ApiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
   */
