import { useUrlQueryParam } from "./use-url-query-param";

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectModalOpen({ projectCreate: true });
  const close = () => setProjectModalOpen({ projectCreate: undefined });

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
  /*return [
    projectCreate === 'true',
    open,
    close
  ] as const;*/
};
