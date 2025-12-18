"use client";

import { useSettingStore } from "@/lib/settingStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Settings } from "@/lib/types";

export default function SettingPage(){
    const theme = useSettingStore((state) => state.theme);
    const setTheme = useSettingStore((state) => state.setTheme);

    const handleThemeChange = (value: string) => {
        setTheme(value as Settings['theme']);
    };

    return(
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-6">
                Settings
            </h1>

            <Card>
                <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                    Customize how the dashboard looks and feels
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Theme</Label>
                    <RadioGroup className="flex" value={theme} onValueChange={handleThemeChange}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light" className="font-normal cursor-pointer">
                        Light
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark" className="font-normal cursor-pointer">
                        Dark
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="system" />
                        <Label htmlFor="system" className="font-normal cursor-pointer">
                        System
                        </Label>
                    </div>
                    </RadioGroup>
                    <p className="text-sm text-muted-foreground">
                    {theme === 'system' 
                        ? 'Automatically match your system theme preference'
                        : `Using ${theme} theme`
                    }
                    </p>
                </div>
                </CardContent>
            </Card>

            <Card className="mt-6">
                <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>
                    Mini Dashboard Application
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Version</span>
                    <span className="font-medium">1.0.0</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Built with</span>
                    <span className="font-medium">React, Next.js, TailwindCSS</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">State Management</span>
                    <span className="font-medium">Zustand</span>
                </div>
                </CardContent>
            </Card>
        </div>
    )
}