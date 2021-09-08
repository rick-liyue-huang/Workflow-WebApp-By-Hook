import { useEffect, useState } from "react";

export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const cleanObject = (object: object) => {
  const copy = { ...object };
  Object.keys(copy).forEach((key) => {
    //@ts-ignore
    const item = copy[key];
    if (isFalsy(item)) {
      //@ts-ignore
      delete copy[key];
    }
  });
  return copy;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

/*
  const debounce = (func, delay) => {
    let timer = null;
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func();
      }, delay);
    }
  };

  const log = debounce(() => console.log('call'), 5000);
  log();
  log();
  log();
* */

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const res = [...value];
      res.splice(index, 1);
      setValue(res);
    },
  };
};
