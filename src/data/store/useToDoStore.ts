import { create } from "zustand";

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

export const useToDoStore = create<ToDoStore>((set, get) => ({
  tasks: [],

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
}));
