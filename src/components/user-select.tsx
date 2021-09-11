import React, { ComponentProps } from "react";
import { useUsers } from "hooks";
import { IdSelect } from "./id-select";

export const UserSelect = (props: ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};
