import { useEffect, useState } from "react";

export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // after value is changed, the timer is working
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // the return function will works after useEffect called, so here it clear the previous timer.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

/*
const debounce = (func, delay) => {
  let timer = undefined;
  // closure
  return (...param) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      func(...param);
    }, delay);
  }
}

const log = debounce(() => console.log('call'), 5000);
log();
log();
log();
*/

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copyValue = [...value];
      copyValue.splice(index, 1);
      setValue(copyValue);
    },
  };
};
