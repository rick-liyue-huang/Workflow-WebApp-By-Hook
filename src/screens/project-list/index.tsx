import React, { useEffect, useState } from "react";
import qs from "qs";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useDebounce } from "../../utils";

export const ApiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreens = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 2000);

  useEffect(() => {
    fetch(
      `${ApiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);

  useEffect(() => {
    fetch(`${ApiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </>
  );
};
