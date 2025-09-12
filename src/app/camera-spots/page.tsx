
"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Camera, VideoOff, X, Save, Video, Locate, ArrowLeft } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useMediaStore } from '@/hooks/use-media-store';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const MAX_RECORDING_SECONDS = 15;

type CapturedMedia = {
  blob: Blob;
  type: 'photo' | 'video';
  url: string;
};


export default function CameraSpotsPage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
  const [currentLocation, setCurrentLocation] = useState<{latitude: number, longitude: number} | null>(null);

  const [capturedMedia, setCapturedMedia] = useState<CapturedMedia | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { addMedia } = useMediaStore();
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
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
            description: 'Please enable camera and microphone permissions in your browser settings.',
          });
        }
      } else {
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Unsupported Browser',
          description: 'Your browser does not support camera access.',
        });
      }
    };
    
    const getLocationPermission = () => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  setHasLocationPermission(true);
                  setCurrentLocation({
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                  });
              },
              (error) => {
                  console.error('Error getting location:', error);
                  setHasLocationPermission(false);
                   toast({
                        variant: "destructive",
                        title: "Location Access Denied",
                        description: "Please enable location services to geotag your captures.",
                    });
              }
          );
      } else {
           setHasLocationPermission(false);
      }
    }

    getCameraPermission();
    getLocationPermission();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  // Clean up object URLs when component unmounts or media changes
  useEffect(() => {
    const mediaUrl = capturedMedia?.url;
    return () => {
      if (mediaUrl) {
        URL.revokeObjectURL(mediaUrl);
      }
    };
  }, [capturedMedia]);

  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (context) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
              if (blob) {
                setCapturedMedia({
                  blob,
                  type: 'photo',
                  url: URL.createObjectURL(blob),
                });
                toast({
                    title: 'Photo Captured!',
                    description: 'Your image has been captured successfully.',
                });
              }
            }, 'image/jpeg');
        }
    }
  };

  const handleClearCapture = () => {
    setCapturedMedia(null);
  };
  
  const handleSaveCapture = async () => {
    if (!capturedMedia) return;

    const { blob, type } = capturedMedia;
    const location = currentLocation ?? undefined;
    
    await addMedia(blob, type, location);
    
    handleClearCapture();
  };

  const handleStartRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      recordedChunksRef.current = [];
      const stream = videoRef.current.srcObject as MediaStream;
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        setCapturedMedia({
          blob,
          type: 'video',
          url: URL.createObjectURL(blob),
        });
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prevTime => {
          const newTime = prevTime + 1;
          if (newTime >= MAX_RECORDING_SECONDS) {
            handleStopRecording();
          }
          return newTime;
        });
      }, 1000);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
  };
  
  return (
    <div className="space-y-8">
        <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
                <Link href="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>
        </div>
        <canvas ref={canvasRef} className="hidden"></canvas>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className='flex items-center gap-2'>
                        <Camera /> Live Camera View
                    </div>
                     <Badge variant={hasLocationPermission ? "secondary" : "destructive"}>
                        <Locate className="mr-2 h-4 w-4" />
                        {hasLocationPermission === null ? "Checking..." : hasLocationPermission ? "Location On" : "Location Off"}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Use your camera to capture the perfect travel shot or record a short video clip. Grant location access to geotag your memories.
                </p>
            </CardContent>
        </Card>

        <Card>
            <CardContent className="p-4">
                <div className="relative aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
                    <video 
                        ref={videoRef} 
                        className={cn("w-full h-full object-cover rounded-md", { 'hidden': !!capturedMedia })} 
                        autoPlay 
                        muted 
                        playsInline 
                    />
                    {isRecording && (
                      <div className="absolute top-2 right-2 flex items-center gap-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md">
                        <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                        <span>{new Date(recordingTime * 1000).toISOString().substr(14, 5)}</span>
                      </div>
                    )}
                    {capturedMedia?.type === 'photo' && (
                        <Image src={capturedMedia.url} alt="Captured photo" width={1920} height={1080} className="w-full h-full object-contain rounded-md" />
                    )}
                    {capturedMedia?.type === 'video' && (
                        <video src={capturedMedia.url} controls autoPlay className="w-full h-full rounded-md" />
                    )}
                    {hasCameraPermission === false && !capturedMedia && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-md">
                            <VideoOff className="h-16 w-16 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Camera is off or not available.</p>
                        </div>
                    )}
                     {hasCameraPermission === null && !capturedMedia && (
                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-md">
                            <Camera className="h-16 w-16 text-muted-foreground animate-pulse" />
                            <p className="mt-4 text-muted-foreground">Waiting for camera access...</p>
                        </div>
                    )}
                </div>
            </CardContent>
             {(hasCameraPermission === false || hasLocationPermission === false) && (
                <CardContent>
                    <Alert variant="destructive">
                         <AlertTitle>Permissions Required</AlertTitle>
                        <AlertDescription>
                            {hasCameraPermission === false && "Please allow camera and microphone access in your browser settings. "}
                            {hasLocationPermission === false && "Please allow location access to geotag your memories. "}
                            You might need to refresh the page after granting permissions.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            )}
            <CardFooter className="flex justify-center gap-4">
                {!!capturedMedia ? (
                    <>
                        <Button onClick={handleClearCapture} variant="outline">
                            <X className="mr-2 h-4 w-4" />
                            Clear
                        </Button>
                        <Button onClick={handleSaveCapture}>
                            <Save className="mr-2 h-4 w-4" />
                            Save {capturedMedia.type === 'photo' ? 'Photo' : 'Video'}
                        </Button>
                    </>
                ) : isRecording ? (
                    <Button onClick={handleStopRecording} variant="destructive">
                        <div className="mr-2 h-4 w-4 border-2 border-white rounded-sm"/>
                        Stop Recording
                    </Button>
                ) : (
                    <>
                        <Button onClick={handleCapturePhoto} disabled={!hasCameraPermission}>
                            <Camera className="mr-2 h-4 w-4"/>
                            Capture Photo
                        </Button>
                        <Button onClick={handleStartRecording} disabled={!hasCameraPermission}>
                            <Video className="mr-2 h-4 w-4"/>
                            Record Video
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    </div>
  );
}
