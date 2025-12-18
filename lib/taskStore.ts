import { create } from 'zustand';
import { Task } from './types';
import { storage } from './storage';

const STORAGE_KEY = 'mini-dashboard-tasks';

interface TaskStore {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  loadTasks: () => void;
  clearAllTasks: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  
  loadTasks: () => {
    const savedTasks = storage.get<Task[]>(STORAGE_KEY);
    if (savedTasks) {
      set({ tasks: savedTasks });
    }
  },
  
  addTask: (title) =>
    set((state) => {
      const newTasks = [
        ...state.tasks,
        {
          id: crypto.randomUUID(),
          title,
          completed: false,
          createdAt: Date.now(),
        },
      ];
      storage.set(STORAGE_KEY, newTasks);
      return { tasks: newTasks };
    }),
  
  toggleTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      storage.set(STORAGE_KEY, newTasks);
      return { tasks: newTasks };
    }),
  
  deleteTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.filter((task) => task.id !== id);
      storage.set(STORAGE_KEY, newTasks);
      return { tasks: newTasks };
    }),
  
  // New: Clear all tasks
  clearAllTasks: () => {
    storage.remove(STORAGE_KEY);
    set({ tasks: [] });
  },
}));