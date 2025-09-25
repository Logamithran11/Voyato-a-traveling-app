
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Download, Loader2, Trash2, Map as MapIcon } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { slugify } from '@/lib/utils';

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
  const router = useRouter();

  const handleDownload = (map: MapItem) => {
    // 1. Immediately set the status to 'downloading'
    setDownloading(prev => ({ ...prev, [map.id]: { status: 'downloading', progress: 0 } }));

    // 2. Simulate the download progress
    const interval = setInterval(() => {
      setDownloading(prev => {
        const currentProgress = prev[map.id]?.progress ?? 0;
        const newProgress = currentProgress + 10;

        if (newProgress >= 100) {
          clearInterval(interval);
          // 3. Update the final state and trigger the toast *after* a brief delay
          // This ensures the render cycle is complete before the toast is shown.
          setTimeout(() => {
            setDownloadedMaps(prevDownloaded => [...prevDownloaded, map.id]);
            setDownloading(prev => ({ ...prev, [map.id]: { status: 'downloaded', progress: 100 } }));
            toast({
              title: "Download Complete!",
              description: `Offline map for ${map.name} has been saved.`,
            });
          }, 100);
          return { ...prev, [map.id]: { status: 'downloading', progress: 100 }};
        }
        
        return { ...prev, [map.id]: { status: 'downloading', progress: newProgress } };
      });
    }, 300);
  };
  
  const getStatus = (mapId: string): DownloadStatus => {
      if (downloading[mapId]?.status === 'downloading') return 'downloading';
      if (downloadedMaps.includes(mapId) || downloading[mapId]?.status === 'downloaded') return 'downloaded';
      return 'not_downloaded';
  }

  const handleDelete = (mapId: string) => {
    setDownloadedMaps(prev => prev.filter(id => id !== mapId));
    const newDownloading = { ...downloading };
    delete newDownloading[mapId];
    setDownloading(newDownloading);
    toast({
        title: "Map Deleted",
        description: `The offline map has been removed.`,
    })
  }

  const handleOpenMap = (map: MapItem) => {
      router.push(`/offline-maps/${slugify(map.name)}`);
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
                <Card key={map.id} className="shadow-lg flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            {map.name}
                            {status === 'downloaded' && <CheckCircle className="h-5 w-5 text-green-500"/>}
                        </CardTitle>
                        <CardDescription>{map.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
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
                         {status === 'not_downloaded' && (
                             <Button 
                                className="w-full" 
                                onClick={() => handleDownload(map)}
                            >
                                <Download className="mr-2 h-4 w-4"/>Download
                            </Button>
                         )}
                         {status === 'downloading' && (
                              <Button 
                                className="w-full" 
                                disabled
                            >
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Downloading
                            </Button>
                         )}
                         {status === 'downloaded' && (
                            <div className="flex gap-2">
                                <Button className="w-full" onClick={() => handleOpenMap(map)}>
                                    <MapIcon className="mr-2 h-4 w-4"/>Open
                                </Button>
                                <Button variant="destructive" className="bg-red-700 text-white" onClick={() => handleDelete(map.id)}>
                                    <Trash2 className="mr-2 h-4 w-4"/>Delete
                                </Button>
                            </div>
                         )}
                    </CardContent>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
