
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, MapPin, Search, X } from 'lucide-react';
import Link from 'next/link';

const locations = [
  {
    id: 'baga-beach',
    name: 'Baga Beach',
    type: 'Beach',
    description: 'One of the most popular beaches in North Goa, known for its vibrant nightlife, water sports, and beach shacks.',
    imageUrl: 'https://picsum.photos/seed/baga-beach/800/600',
    imageHint: 'lively beach party'
  },
  {
    id: 'old-goa',
    name: 'Old Goa (Velha Goa)',
    type: 'Historical Site',
    description: 'A UNESCO World Heritage site, featuring magnificent colonial-era churches and cathedrals like the Basilica of Bom Jesus.',
    imageUrl: 'https://picsum.photos/seed/old-goa-church/800/600',
    imageHint: 'historic church'
  },
  {
    id: 'dudhsagar-falls',
    name: 'Dudhsagar Falls',
    type: 'Nature',
    description: 'A spectacular four-tiered waterfall located on the Mandovi River. Its name means "Sea of Milk".',
    imageUrl: 'https://picsum.photos/seed/dudhsagar-falls/800/600',
    imageHint: 'large waterfall'
  },
  {
    id: 'anjuna-market',
    name: 'Anjuna Flea Market',
    type: 'Market',
    description: 'Held every Wednesday, this famous market offers everything from handicrafts and jewelry to clothes and souvenirs.',
    imageUrl: 'https://picsum.photos/seed/anjuna-market/800/600',
    imageHint: 'flea market'
  },
  {
    id: 'fort-aguada',
    name: 'Fort Aguada',
    type: 'Historical Site',
    description: 'A well-preserved 17th-century Portuguese fort with a lighthouse, offering stunning views of the Arabian Sea.',
    imageUrl: 'https://picsum.photos/seed/fort-aguada/800/600',
    imageHint: 'coastal fort'
  }
];

type Location = typeof locations[0];

export default function ExploreMapsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(locations[0]);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 h-full flex flex-col border-r bg-background">
        <div className="p-4 border-b">
          <Button variant="outline" size="sm" asChild className="mb-4">
              <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
              </Link>
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Goa..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {filteredLocations.length > 0 ? (
            <div className="p-4 space-y-2">
              {filteredLocations.map(location => (
                <Card
                  key={location.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow ${selectedLocation?.id === location.id ? 'border-primary shadow-md' : ''}`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <CardContent className="p-3 flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">{location.name}</h3>
                      <p className="text-xs text-muted-foreground">{location.type}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p>No locations found for &quot;{searchTerm}&quot;.</p>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Main Content (Map and Details) */}
      <div className="flex-1 h-full relative">
        {/* Map Background */}
        <Image
          src="https://picsum.photos/seed/goa-map-satellite/1920/1080"
          alt="Map of Goa"
          data-ai-hint="map satellite"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Selected Location Details */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 md:bottom-auto md:top-4 md:left-auto md:w-96 p-1">
             <Card className="bg-background/90 backdrop-blur-sm animate-in fade-in-50">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                             <CardTitle className="font-headline">{selectedLocation.name}</CardTitle>
                             <CardDescription>{selectedLocation.type}</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7 -mr-2 -mt-2" onClick={() => setSelectedLocation(null)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="relative aspect-video rounded-md overflow-hidden mb-4">
                        <Image 
                            src={selectedLocation.imageUrl}
                            alt={selectedLocation.name}
                            data-ai-hint={selectedLocation.imageHint}
                            fill
                            className="object-cover"
                        />
                    </div>
                  <p className="text-sm text-muted-foreground">{selectedLocation.description}</p>
                </CardContent>
              </Card>
          </div>
        )}
      </div>
    </div>
  );
}
