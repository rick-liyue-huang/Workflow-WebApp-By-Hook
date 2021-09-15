import { useSearchParams } from "react-router-dom";
import { useUrlQueryParam } from "./use-url-query-param";
import { useProject } from "./use-project";
import { useSetUrlSearchParam } from "./index";

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editProjectId }, setEditProjectId] = useUrlQueryParam([
    "editProjectId",
  ]);
  const { data: editingProject, isLoading } = useProject(Number(editProjectId));
  // const [_, setUrlParams] = useSearchParams();
  const setUrlParams = useSetUrlSearchParam();

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: "", editProjectId: "" });
  const startEdit = (id: number) => setEditProjectId({ editProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };

  /*return [
    projectCreate === 'true',
    open,
    close
  ] as const;*/
};
