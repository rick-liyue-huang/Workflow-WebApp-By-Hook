export const isFalsy = (value: unknown): boolean =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const copy = { ...object };
  Object.keys(copy).forEach((key) => {
    const item = copy[key];
    if (isFalsy(item)) {
      delete copy[key];
    }
  });
  return copy;
};

export const resetRouter = () =>
  (window.location.href = window.location.origin);
