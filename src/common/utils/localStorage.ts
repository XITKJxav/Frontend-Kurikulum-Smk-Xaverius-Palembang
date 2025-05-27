import { snackbar } from "./snackbar";

export const LocalStorage = () => {
  const setItem = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, encodeURI(JSON.stringify(value)));
    } catch {
      snackbar.error(`Failed to save data for "${key}" in localStorage.`);
    }
  };

  const getItem = <T = unknown>(key: string): T | undefined => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(decodeURI(item)) as T) : undefined;
    } catch {
      snackbar.error(`Failed to retrieve data for "${key}" from localStorage.`);
    }
  };

  const deleteItem = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      snackbar.error(`Failed to remove data for "${key}" from localStorage.`);
    }
  };

  return {
    setItem,
    getItem,
    deleteItem,
  };
};
