import { create, StateCreator, State } from "zustand";

import { generateId } from "../helpers";

interface Task {
  id: string;
  title: string;
}

interface ToDoStore {
  tasks: Task[];

  createTask: (title: string) => void;
  updateTask: (title: string, id: string) => void;
  removeTask: (id: string) => void;
}

const isToDoStore = (object: any): object is ToDoStore => "tasks" in object;

const localStorageUpdate =
  <T>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (nextState, ...args) => {
        if (isToDoStore(nextState)) {
          window.localStorage.setItem("tasks", JSON.stringify(nextState.tasks));
        }

        set(nextState, ...args);
      },

      get,
      api
    );

const getCurrentState = () => {
  try {
    const currentState = JSON.parse(
      window.localStorage.getItem("tasks") || "[]"
    );

    return currentState;
  } catch (err) {
    window.localStorage.setItem("tasks", "[]");
  }

  return [];
};

export const useToDoStore = create<ToDoStore>(
  localStorageUpdate((set, get) => ({
    tasks: getCurrentState(),

    createTask: (title) => {
      const { tasks } = get();

      const newTask = {
        id: generateId(),
        title,
      };

      set({
        tasks: [newTask].concat(tasks),
      });
    },

    updateTask: (title, id) => {
      const { tasks } = get();

      set({
        tasks: tasks.map((task) => ({
          ...task,
          title: task.id === id ? title : task.title,
        })),
      });
    },

    removeTask: (id) => {
      const { tasks } = get();

      set({
        tasks: tasks.filter((task) => task.id !== id),
      });
    },
  }))
);
