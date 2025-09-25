
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, Cloud, TrafficCone, Shield, Bell, X } from 'lucide-react';
import Link from 'next/link';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const activeAlerts = [
    {
        id: 1,
        type: "Weather",
        title: "Heavy Rainfall Warning",
        location: "Mumbai, Maharashtra",
        description: "Heavy rainfall expected in the next 24 hours. Avoid coastal areas. Possible waterlogging in low-lying areas.",
        time: "2h ago",
        icon: Cloud,
        variant: "destructive" as "destructive" | "default",
    },
    {
        id: 2,
        type: "Traffic",
        title: "Road Closure on NH48",
        location: "Pune-Mumbai Expressway",
        description: "A major accident has blocked the expressway near Lonavala. Expect long delays. Consider alternate routes.",
        time: "30m ago",
        icon: TrafficCone,
        variant: "default" as "destructive" | "default",
    },
];

export default function SmartAlertsPage() {

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

       <Card className="shadow-lg">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                <AlertTriangle className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Smart Alerts</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Stay Ahead, Stay Safe.”
            </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Active Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {activeAlerts.map(alert => (
                         <Card key={alert.id} className={alert.variant === 'destructive' ? 'border-destructive' : ''}>
                            <CardHeader className="flex flex-row items-start gap-4">
                                <div className={`p-2 rounded-full bg-${alert.variant === 'destructive' ? 'destructive' : 'primary'}/10`}>
                                    <alert.icon className={`h-6 w-6 text-${alert.variant === 'destructive' ? 'destructive' : 'primary'}`} />
                                </div>
                                <div className="flex-grow">
                                    <CardTitle className="text-lg">{alert.title}</CardTitle>
                                    <CardDescription>{alert.location} - {alert.time}</CardDescription>
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6"><X className="h-4 w-4"/></Button>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{alert.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                    {activeAlerts.length === 0 && (
                        <p className="text-center text-muted-foreground p-4">No active alerts for your locations.</p>
                    )}
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Choose which alerts you want to receive.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="weather-alerts" className="flex items-center gap-2 cursor-pointer"><Cloud/> Weather</Label>
                        <Switch id="weather-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="traffic-alerts" className="flex items-center gap-2 cursor-pointer"><TrafficCone/> Traffic & Strikes</Label>
                        <Switch id="traffic-alerts" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="safety-alerts" className="flex items-center gap-2 cursor-pointer"><Shield/> Safety</Label>
                        <Switch id="safety-alerts" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="push-notifications" className="flex items-center gap-2 cursor-pointer"><Bell/> Push Notifications</Label>
                        <Switch id="push-notifications" defaultChecked />
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>

    </div>
  );
}
