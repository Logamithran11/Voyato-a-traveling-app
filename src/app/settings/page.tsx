
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { User, Palette, Bell, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import Link from 'next/link';

export default function SettingsPage() {

    const { toast } = useToast();
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const [userName, setUserName] = useLocalStorage('userName', 'Alex Doe');
    const [currentName, setCurrentName] = useState(userName);

    useEffect(() => {
        setIsClient(true);
        const savedTheme = localStorage.getItem('theme');
        const darkMode = savedTheme ? savedTheme === 'dark' : true;
        setIsDarkMode(darkMode);
        document.documentElement.classList.toggle('dark', darkMode);
        setCurrentName(userName);
    }, [userName]);

    const handleThemeChange = (checked: boolean) => {
        setIsDarkMode(checked);
        localStorage.setItem('theme', checked ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', checked);
    };

    const handleSaveChanges = () => {
        setUserName(currentName);
        toast({
            title: "Settings Saved",
            description: "Your changes have been saved successfully.",
        });
    };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
                <Link href="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Link>
            </Button>
        </div>
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
                <User /> Profile Settings
            </CardTitle>
            <CardDescription>
                Manage your personal information.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="alex.doe@example.com" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                </div>
            </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Palette /> Appearance
          </CardTitle>
          <CardDescription>
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">
                {isDarkMode ? "Enabled" : "Disabled"}.
              </p>
            </div>
            {isClient && <Switch checked={isDarkMode} onCheckedChange={handleThemeChange} aria-label="Toggle dark mode" />}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Bell /> Notifications
          </CardTitle>
          <CardDescription>
            Manage your notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive updates about your bookings and recommendations.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
           <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">
                Get real-time alerts on your device.
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </div>
    </div>
  );
}
