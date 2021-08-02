import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value, delay) => {
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
