
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, View, Camera, ScanLine, X, History } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const monuments = [
  { id: 1, name: "Taj Mahal", hint: "Point at the main dome", image: "https://picsum.photos/seed/taj-mahal-ar/600/400" },
  { id: 2, name: "Qutub Minar", hint: "Scan the first balcony", image: "https://picsum.photos/seed/qutub-minar-ar/600/400" },
  { id: 3, name: "Gateway of India", hint: "Focus on the central arch", image: "https://picsum.photos/seed/gateway-ar/600/400" },
];

export default function HeritageARPage() {
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { toast } = useToast();
    const [isScanning, setIsScanning] = useState(false);
    const [scannedMonument, setScannedMonument] = useState<typeof monuments[0] | null>(null);

    useEffect(() => {
        const getCameraPermission = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            setHasCameraPermission(true);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            if ((error as Error).name !== 'NotAllowedError') {
                 toast({
                    variant: 'destructive',
                    title: 'Camera Access Denied',
                    description: 'Please enable camera permissions in your browser settings to use the AR feature.',
                });
            }
          }
        };

        getCameraPermission();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
            }
        }
    }, [toast]);

    const handleScan = () => {
        setIsScanning(true);
        setScannedMonument(null);
        setTimeout(() => {
            // Simulate a successful scan
            const randomMonument = monuments[Math.floor(Math.random() * monuments.length)];
            setScannedMonument(randomMonument);
            setIsScanning(false);
            toast({ title: "Monument Detected!", description: `Displaying information for ${randomMonument.name}` });
        }, 2500);
    }

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
                <View className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Heritage AR Experience</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “History in Your Hands.”
            </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-2">
            <div className="relative aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />

                {isScanning && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                        <ScanLine className="h-24 w-24 text-white animate-pulse" />
                        <p className="text-white mt-4">Scanning for monuments...</p>
                    </div>
                )}

                {hasCameraPermission === false && (
                    <Alert variant="destructive" className="absolute m-4 max-w-sm">
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                            Please allow camera access to use this feature. You might need to refresh the page after granting permission.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
            <Button size="lg" className="w-full max-w-xs" onClick={handleScan} disabled={!hasCameraPermission || isScanning}>
                <Camera className="mr-2 h-4 w-4" /> 
                {isScanning ? "Scanning..." : "Scan Monument"}
            </Button>
            <p className="text-xs text-muted-foreground">Point your camera at a monument and press scan.</p>
        </CardFooter>
      </Card>

      {scannedMonument && (
        <Card className="fixed bottom-0 left-0 right-0 z-10 w-full max-w-md mx-auto animate-in slide-in-from-bottom-20">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="font-headline text-2xl">{scannedMonument.name}</CardTitle>
                    <Button variant="ghost" size="icon" className="h-7 w-7 -mr-2 -mt-2" onClick={() => setScannedMonument(null)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Image src={scannedMonument.image} alt={scannedMonument.name} width={600} height={400} className="rounded-md mb-4" />
                <p className="text-muted-foreground">Built in 1632 by Emperor Shah Jahan, the Taj Mahal is a white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra. It was commissioned to house the tomb of his favorite wife, Mumtaz Mahal.</p>
            </CardContent>
            <CardFooter>
                <Button variant="secondary" className="w-full">
                    <History className="mr-2 h-4 w-4" /> View Full History
                </Button>
            </CardFooter>
        </Card>
      )}

    </div>
  );
}
