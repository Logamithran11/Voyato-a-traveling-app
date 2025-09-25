
"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Download, Loader2 } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

type DownloadStatus = 'not_downloaded' | 'downloading' | 'downloaded';

type MapItem = {
  id: string;
  name: string;
  description: string;
  size: string; // e.g., "54 MB"
};

const availableMaps: MapItem[] = [
  { id: 'goa', name: 'Goa', description: 'Beaches, nightlife, and historic churches.', size: '45 MB' },
  { id: 'rajasthan', name: 'Rajasthan', description: 'Forts, palaces, and desert landscapes.', size: '78 MB' },
  { id: 'kerala', name: 'Kerala', description: 'Backwaters, tea plantations, and serene nature.', size: '62 MB' },
  { id: 'himachal', name: 'Himachal Pradesh', description: 'Himalayan peaks, trekking routes, and scenic towns.', size: '85 MB' },
  { id: 'karnataka', name: 'Karnataka', description: 'Ancient ruins, tech hubs, and coffee estates.', size: '71 MB' },
  { id: 'maharashtra', name: 'Maharashtra', description: 'Bustling cities, coastal forts, and rolling hills.', size: '92 MB' },
];

export default function OfflineMapsPage() {
  const [downloadedMaps, setDownloadedMaps] = useLocalStorage<string[]>('offlineMaps', []);
  const [downloading, setDownloading] = useState<Record<string, { status: DownloadStatus; progress: number }>>({});
  const { toast } = useToast();

  const handleDownload = (map: MapItem) => {
    setDownloading(prev => ({ ...prev, [map.id]: { status: 'downloading', progress: 0 } }));

    const interval = setInterval(() => {
      setDownloading(prev => {
        const newProgress = (prev[map.id]?.progress ?? 0) + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setDownloadedMaps(prevDownloaded => [...prevDownloaded, map.id]);
          toast({
            title: "Download Complete!",
            description: `Offline map for ${map.name} has been saved.`,
          });
          return { ...prev, [map.id]: { status: 'downloaded', progress: 100 } };
        }
        return { ...prev, [map.id]: { status: 'downloading', progress: newProgress } };
      });
    }, 300);
  };
  
  const getStatus = (mapId: string): DownloadStatus => {
      if (downloading[mapId]?.status === 'downloading') return 'downloading';
      if (downloadedMaps.includes(mapId)) return 'downloaded';
      return 'not_downloaded';
  }

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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-6 w-6"/>
            Offline Maps
          </CardTitle>
          <CardDescription>
            Download maps for entire states or cities to use when you're offline. POIs are included.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {availableMaps.map(map => {
            const status = getStatus(map.id);
            return (
                <Card key={map.id} className="shadow-lg">
                    <CardHeader>
                        <CardTitle>{map.name}</CardTitle>
                        <CardDescription>{map.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span>Map Size</span>
                            <span>{map.size}</span>
                        </div>
                        {status === 'downloading' && (
                           <div className="space-y-2">
                                <Progress value={downloading[map.id]?.progress ?? 0} />
                                <p className="text-sm text-muted-foreground text-center">Downloading... {downloading[map.id]?.progress}%</p>
                           </div>
                        )}
                    </CardContent>
                    <CardContent>
                         <Button 
                            className="w-full" 
                            onClick={() => handleDownload(map)}
                            disabled={status !== 'not_downloaded'}
                        >
                            {status === 'not_downloaded' && <><Download className="mr-2 h-4 w-4"/>Download</>}
                            {status === 'downloading' && <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Downloading</>}
                            {status === 'downloaded' && <><CheckCircle className="mr-2 h-4 w-4"/>Downloaded</>}
                        </Button>
                    </CardContent>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
