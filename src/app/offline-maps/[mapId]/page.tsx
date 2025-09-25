
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Map, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function OfflineMapDisplayPage({ params }: { params: { mapId: string } }) {

  const mapName = decodeURIComponent(params.mapId).replace(/-/g, ' ');
  const imageUrl = `https://placehold.co/1280x720/2d3250/ffffff/png?text=${encodeURIComponent(mapName)}%0A(Offline%20Map)&font=lato`;

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
            <Link href="/offline-maps">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Offline Maps
            </Link>
            </Button>
        </div>
      <Card>
        <CardHeader>
          <CardTitle className="capitalize flex items-center gap-2">
            <Map /> Offline Map: {mapName}
          </CardTitle>
          <CardDescription>
            This is a placeholder for the offline map view. In a real application, an interactive map would be rendered here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
            <Image
                src={imageUrl}
                alt={`Map of ${mapName}`}
                fill
                className="object-contain"
                data-ai-hint="map placeholder"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
