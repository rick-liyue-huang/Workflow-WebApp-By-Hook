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

export const useDebounce = (value: any, delay?: number) => {
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
