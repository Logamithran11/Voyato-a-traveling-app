
"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Map as MapIcon, Download, Navigation, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type DownloadStatus = 'not_downloaded' | 'downloading' | 'downloaded';

const availableMaps = [
  { id: 'goa', name: 'Goa', size: '15 MB' },
  { id: 'rajasthan', name: 'Rajasthan', size: '35 MB' },
  { id: 'kerala', name: 'Kerala', size: '25 MB' },
  { id: 'himalayas-trek', name: 'Himalayas Trekking Trails', size: '50 MB' },
];

export default function OfflineMapsPage() {
  const [downloads, setDownloads] = useState<Record<string, { status: DownloadStatus; progress: number }>>({
    'goa': { status: 'downloaded', progress: 100 },
    'rajasthan': { status: 'not_downloaded', progress: 0 },
    'kerala': { status: 'not_downloaded', progress: 0 },
    'himalayas-trek': { status: 'not_downloaded', progress: 0 },
  });
  const { toast } = useToast();

  const handleDownload = (mapId: string) => {
    setDownloads(prev => ({ ...prev, [mapId]: { status: 'downloading', progress: 0 } }));

    const interval = setInterval(() => {
      setDownloads(prev => {
        const newProgress = prev[mapId].progress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          toast({
            title: "Download Complete!",
            description: `The map for ${availableMaps.find(m => m.id === mapId)?.name} is ready for offline use.`
          })
          return { ...prev, [mapId]: { status: 'downloaded', progress: 100 } };
        }
        return { ...prev, [mapId]: { ...prev[mapId], progress: newProgress } };
      });
    }, 200);
  };
  
  const getButtonState = (mapId: string) => {
      const download = downloads[mapId];
      switch(download.status) {
          case 'not_downloaded':
              return <Button onClick={() => handleDownload(mapId)}><Download className="mr-2 h-4 w-4" /> Download Map</Button>;
          case 'downloading':
              return <Button variant="outline" disabled><Navigation className="mr-2 h-4 w-4 animate-spin" /> Downloading...</Button>;
          case 'downloaded':
              return <Button variant="secondary" asChild><Link href={`/offline-maps/${mapId}`}><MapIcon className="mr-2 h-4 w-4" /> View Map</Link></Button>;
      }
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
                <MapIcon className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Offline Mode with Maps</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Stay Connected, Even Offline.”
            </CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Available Maps for Download</CardTitle>
            <CardDescription>Download maps to use them for navigation without an internet connection.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {availableMaps.map(map => {
                const download = downloads[map.id];
                return (
                    <Card key={map.id}>
                        <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <p className="font-semibold">{map.name}</p>
                                <p className="text-sm text-muted-foreground">{map.size}</p>
                                {download.status === 'downloading' && (
                                    <Progress value={download.progress} className="mt-2 h-2 w-full sm:w-48" />
                                )}
                            </div>
                           {getButtonState(map.id)}
                        </CardContent>
                    </Card>
                )
            })}
        </CardContent>
      </Card>
    </div>
  );
}
