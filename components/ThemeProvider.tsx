"use client";

import React, { useEffect } from 'react';
import { useSettingStore } from '@/lib/settingStore';

export default function ThemeProvider({
    children,
} : {
    children: React.ReactNode;
}) {
    const theme = useSettingStore((state) => state.theme);
    const loadSettings = useSettingStore((state) => state.loadSettings);

    useEffect(() => {
        loadSettings();
    }, [loadSettings]);

    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove('light', 'dark');

        if(theme === 'system'){
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';

            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
    }, [theme]);

    return <>{children}</>;
}