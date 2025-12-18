import { create } from 'zustand';
import { Settings } from './types';
import { storage } from './storage';

const STORAGE_KEY = 'mini-dashboard-settings';

interface SettingStore extends Settings {
    setTheme: (theme: Settings['theme']) => void;
    loadSettings: ()=> void;
}

export const useSettingStore = create<SettingStore>((set) => ({
    theme: 'system',

    loadSettings: () => {
        const savedSettings = storage.get<Settings>(STORAGE_KEY);
        if(savedSettings){
            set(savedSettings);
        }
    },

    setTheme: (theme) => {
        const newSettings: Settings = { theme };
        storage.set(STORAGE_KEY, newSettings);
        set(newSettings);
    },
}));