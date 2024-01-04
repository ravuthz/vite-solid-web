import { createEffect } from "solid-js";
import { createStore } from 'solid-js/store';
import type { Store, SetStoreFunction } from 'solid-js/store';

export type StorageType = "localStorage" | "sessionStorage";

export function persistStorage(storage: StorageType, name: string) {
  return {
    setVal: (val: any) => {
      (window[storage])?.setItem(name, JSON.stringify(val) ?? "{}");
    },
    getVal: () => {
      return JSON.parse((window[storage])?.getItem(name) || "{}");
    },
  };
}

export type BrowserStorageOptions = {
  name: string;
  storage: StorageType;
};

export function createBrowserStorage<T extends object = {}>(initialState: T, options: BrowserStorageOptions) {
  const { name, storage } = options;
  const [state, setState] = createStore(initialState);

  const localState = window[storage]?.getItem(name);
  if (localState) {
    setState(JSON.parse(localState));
  };

  createEffect(() => {
    window[storage]?.setItem(name, JSON.stringify(state));
  });

  return [state, setState] as [Store<T>, SetStoreFunction<T>];
}

export function createLocalStorage<T extends object = {}>(name: string, initialState: T) {
  return createBrowserStorage(initialState, { name, storage: "localStorage" });
}

export function createSessionStorage<T extends object = {}>(name: string, initialState: T) {
  return createBrowserStorage(initialState, { name, storage: "sessionStorage" });
}
