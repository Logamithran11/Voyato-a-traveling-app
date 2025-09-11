
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Camera, VideoOff } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export default function CameraSpotsPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API is not supported in this browser.');
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Unsupported Browser',
          description: 'Your browser does not support camera access.',
        });
        return;
      }
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  return (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <Camera /> Live Camera View
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Use your camera to capture the perfect travel shot.
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardContent className="p-4">
                <div className="relative aspect-video bg-muted rounded-md flex items-center justify-center">
                    <video ref={videoRef} className="w-full h-full object-cover rounded-md" autoPlay muted playsInline />
                    {hasCameraPermission === false && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-md">
                            <VideoOff className="h-16 w-16 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Camera is off or not available.</p>
                        </div>
                    )}
                     {hasCameraPermission === null && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-md">
                            <Camera className="h-16 w-16 text-muted-foreground animate-pulse" />
                            <p className="mt-4 text-muted-foreground">Waiting for camera access...</p>
                        </div>
                    )}
                </div>
            </CardContent>
             {hasCameraPermission === false && (
                <CardContent>
                    <Alert variant="destructive">
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                            Please allow camera access in your browser settings to use this feature. You might need to refresh the page after granting permission.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            )}
            <CardContent className="flex justify-center">
                 <Button disabled={!hasCameraPermission}>
                    <Camera className="mr-2 h-4 w-4"/>
                    Capture Photo
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
