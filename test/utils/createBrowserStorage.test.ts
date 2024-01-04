import { createRoot } from "solid-js";
import { describe, expect, it, beforeEach } from 'vitest';

import { createBrowserStorage, createLocalStorage, BrowserStorageOptions } from '../../src/utils/createBrowserStorage';

const initialState = {
  todos: [],
  newTitle: ""
}

// wait a tick to resolve all effects
const delayFn = async (fn, delay = 100) => {
  return new Promise((resolve) => setTimeout(() => resolve(fn()), delay))
};

describe("createLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("reads pre-existing state from localStorage", () => {
    createRoot((dispose) => {
      const savedState = {
        todos: [{ title: "Learn Solid" }],
        newTitle: "Learn Solid"
      };
      localStorage.setItem("state", JSON.stringify(savedState));
      const [state] = createLocalStorage('state', initialState);
      expect(state).toEqual(savedState);
      dispose();
    })
  });

  it("stores new state to localStorage", () => {
    createRoot(async (dispose) => {
      const [state, setState] = createLocalStorage('state', initialState);
      setState("newTitle", "created");

      await delayFn(() => {
        expect(JSON.parse(localStorage.getItem("state") || "")).toEqual({
          todos: [],
          newTitle: "created",
        });
      });

      dispose();
    });
  });

  it("updates state multiple times", () => {
    createRoot(async (dispose) => {
      const [state, setState] = createLocalStorage('state', initialState);

      setState("newTitle", "first");
      await delayFn(() => {
        expect(JSON.parse(localStorage.getItem("state") || "")).toEqual({
          todos: [],
          newTitle: "first",
        });

      }, 100);

      setState("newTitle", "second");
      await delayFn(() => {
        expect(JSON.parse(localStorage.getItem("state") || "")).toEqual({
          todos: [],
          newTitle: "second",
        });
      }, 100);

      dispose();
    });
  });

})

const [get, set] = createBrowserStorage(initialState, {
  name: "state",
  storage: "localStorage",
});

set("newTitle", "created");