import { useEffect, useRef } from "react";

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const prevTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = prevTitle;
      }
    };
  }, [keepOnUnmount]);
};
