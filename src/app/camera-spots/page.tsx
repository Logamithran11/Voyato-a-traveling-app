
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Camera, VideoOff, X, Save } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useDocuments } from '@/hooks/use-documents-store';
import { useRouter } from 'next/navigation';


export default function CameraSpotsPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const { addDocument } = useDocuments();
  const router = useRouter();


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

  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (context) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            setCapturedImage(dataUrl);
            toast({
                title: 'Photo Captured!',
                description: 'Your image has been captured successfully.',
            });
        }
    }
  };

  const handleClearPhoto = () => {
    setCapturedImage(null);
  };
  
  const handleSavePhoto = () => {
    if (!capturedImage) return;

    const date = new Date();
    const newDocument = {
        name: `Capture-${date.toISOString()}.jpg`,
        size: `${(capturedImage.length / 1024).toFixed(1)} KB`,
        date: date.toISOString().split('T')[0],
        isImage: true,
        dataUrl: capturedImage
    };
    addDocument(newDocument);
    toast({
        title: "Photo Saved!",
        description: "Your captured photo has been saved to your documents."
    });
    setCapturedImage(null);
    router.push('/documents');
  }

  return (
    <div className="space-y-8">
        <canvas ref={canvasRef} className="hidden"></canvas>
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
                    <video ref={videoRef} className={`w-full h-full object-cover rounded-md ${capturedImage ? 'hidden' : 'block'}`} autoPlay muted playsInline />
                    {capturedImage && (
                        <Image src={capturedImage} alt="Captured photo" layout="fill" className="object-contain rounded-md" />
                    )}
                    {hasCameraPermission === false && !capturedImage && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-md">
                            <VideoOff className="h-16 w-16 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Camera is off or not available.</p>
                        </div>
                    )}
                     {hasCameraPermission === null && !capturedImage && (
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
            <CardFooter className="flex justify-center gap-4">
                {capturedImage ? (
                    <>
                        <Button onClick={handleClearPhoto} variant="outline">
                            <X className="mr-2 h-4 w-4" />
                            Clear Photo
                        </Button>
                        <Button onClick={handleSavePhoto}>
                            <Save className="mr-2 h-4 w-4" />
                            Save to Documents
                        </Button>
                    </>
                ) : (
                    <Button onClick={handleCapturePhoto} disabled={!hasCameraPermission}>
                        <Camera className="mr-2 h-4 w-4"/>
                        Capture Photo
                    </Button>
                )}
            </CardFooter>
        </Card>
    </div>
  );
}
