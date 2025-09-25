
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Bell, Navigation, Hospital, Phone, User, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function SOSPage() {
    const { toast } = useToast();
    const [isPressed, setIsPressed] = useState(false);
    const [timer, setTimer] = useState(5);

    const handlePress = () => {
        setIsPressed(true);
        let countdown = 5;
        const interval = setInterval(() => {
            countdown -= 1;
            setTimer(countdown);
            if (countdown <= 0) {
                clearInterval(interval);
                triggerAlert();
                setIsPressed(false);
                setTimer(5);
            }
        }, 1000);

        // Allow cancellation
        const handleMouseUp = () => {
            clearInterval(interval);
            setIsPressed(false);
            setTimer(5);
            document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mouseup', handleMouseUp);
    };

    const triggerAlert = () => {
        toast({
            variant: "destructive",
            title: "SOS Activated!",
            description: "Emergency contacts and authorities have been alerted with your live location.",
            duration: 10000,
        });
    };

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
            <div className="mx-auto bg-destructive/10 text-destructive p-3 rounded-full w-fit">
                <Shield className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Women Safety SOS</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Safety First.”
            </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-10">
            <button
                onMouseDown={handlePress}
                className={`relative flex items-center justify-center h-48 w-48 rounded-full transition-all duration-300 focus:outline-none 
                ${isPressed ? 'bg-red-700 scale-110' : 'bg-red-600 hover:bg-red-700'} 
                text-white font-bold text-3xl shadow-lg active:scale-105`}
            >
                {isPressed && (
                    <div className="absolute inset-0 rounded-full border-4 border-white animate-ping"></div>
                )}
                {isPressed ? timer : "SOS"}
            </button>
        </CardContent>
        <CardFooter className="text-center flex-col gap-2">
            <p className="font-semibold">Press and Hold for 5 Seconds to Activate</p>
            <p className="text-sm text-muted-foreground">This will alert your emergency contacts and nearby authorities.</p>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Emergency Contacts</span>
                    <Button variant="ghost" size="icon"><PlusCircle className="h-5 w-5" /></Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                    <User className="h-6 w-6 text-primary" />
                    <div>
                        <p className="font-medium">Mom</p>
                        <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <User className="h-6 w-6 text-primary" />
                    <div>
                        <p className="font-medium">Dad</p>
                        <p className="text-sm text-muted-foreground">+91 98765 43211</p>
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Nearest Help Centers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Hospital className="h-6 w-6 text-destructive" />
                    <div>
                        <p className="font-medium">City Hospital</p>
                        <p className="text-sm text-muted-foreground">2.5 km away</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <div>
                        <p className="font-medium">Central Police Station</p>
                        <p className="text-sm text-muted-foreground">3.1 km away</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
