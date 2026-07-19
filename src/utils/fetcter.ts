export const fetcher = async <T>(
  url: string,
  init?: RequestInit,
): Promise<T> => {
  try {
    const response = await fetch(url, init);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return (await response.json()) as Promise<T>;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw Error(message);
  }
};

export const STORAGE_KEY = "climatesnap_favorites";

export const getData = async <T>(key: string, initialData: T): Promise<T> => {
  try {
    if (!window) throw new Error("Window is not defined");

    const res = localStorage.getItem(key);
    if (res) return JSON.parse(res);

    saveData(key, initialData);
    return initialData;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw Error(message);
  }
};

export const saveData = async <T>(key: string, data: T) => {
  try {
    if (!window) throw new Error("Window is not defined");

    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw Error(message);
  }
};

export const clearData = async (key: string) => {
  try {
    if (!window) throw new Error("Window is not defined");

    localStorage.removeItem(key);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw Error(message);
  }
};
