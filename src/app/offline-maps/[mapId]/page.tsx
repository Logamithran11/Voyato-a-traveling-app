
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Map, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function OfflineMapDisplayPage({ params }: { params: { mapId: string } }) {

  const mapName = decodeURIComponent(params.mapId).replace(/-/g, ' ');
  const imageUrl = `https://picsum.photos/seed/${params.mapId}/1280/720`;

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
                className="object-cover"
                data-ai-hint="map satellite"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
