import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  /*const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState(initialPresent);
  const [future, setFuture] = useState<T[]>([]);*/

  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (past.length === 0) return currentState;
      const previous = past[past.length - 1];
      // after undo, the new [] will reduce 1
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
      /*setPast(newPast);
        setPresent(previous);
        setFuture([present, ...future]);*/
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const { present, future, past } = currentState;
      if (future.length === 0) return currentState;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { present, future, past } = currentState;
      if (newPresent === present) {
        return currentState;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
    /*setPast([...past, present])
      setPresent(newPresent);
      setFuture([]);*/
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      /*setPast([]);
      setPresent(newPresent);
      setFuture([]);*/
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }];
};
