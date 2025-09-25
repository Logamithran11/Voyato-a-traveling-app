
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Film, Map, Clapperboard, Search, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

const movieLocations = [
  {
    movie: "Dil Chahta Hai",
    location: "Chapora Fort, Goa",
    scene: "The iconic friendship pose scene.",
    image: "https://picsum.photos/seed/chapora-fort/800/600",
    imageHint: "fort ocean view"
  },
  {
    movie: "3 Idiots",
    location: "Pangong Tso Lake, Ladakh",
    scene: "The climax scene where Rancho reunites with his friends.",
    image: "https://picsum.photos/seed/pangong-lake/800/600",
    imageHint: "blue mountain lake"
  },
  {
    movie: "Yeh Jawaani Hai Deewani",
    location: "Hadimba Temple, Manali",
    scene: "Bunny and Naina's temple visit.",
    image: "https://picsum.photos/seed/hadimba-temple/800/600",
    imageHint: "wooden temple forest"
  },
  {
    movie: "Chennai Express",
    location: "Dudhsagar Falls, Goa",
    scene: "The train journey scene.",
    image: "https://picsum.photos/seed/dudhsagar-falls-movie/800/600",
    imageHint: "waterfall train bridge"
  },
];

export default function FilmLocationsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLocations = movieLocations.filter(loc =>
        loc.movie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <Film className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Bollywood Tourism</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Walk Where the Stars Did.”
            </CardDescription>
        </CardHeader>
        <CardContent>
             <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search by movie or location..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredLocations.map((loc, index) => (
            <Card key={index} className="overflow-hidden shadow-lg">
                <div className="relative h-64 w-full">
                    <Image src={loc.image} alt={loc.movie} data-ai-hint={loc.imageHint} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <CardHeader className="absolute bottom-0 text-white p-4">
                        <CardTitle className="font-headline text-2xl">{loc.movie}</CardTitle>
                    </CardHeader>
                </div>
                <CardContent className="p-4">
                     <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{loc.location}</span>
                     </div>
                     <p className="text-sm">
                        <span className="font-semibold">Iconic Scene:</span> {loc.scene}
                     </p>
                </CardContent>
                <CardFooter>
                    <Button variant="secondary" className="w-full">
                        <Map className="mr-2 h-4 w-4" /> View on Map & Book Tour
                    </Button>
                </CardFooter>
            </Card>
        ))}
        {filteredLocations.length === 0 && (
             <Card className="md:col-span-2">
                <CardContent className="p-8 text-center text-muted-foreground">
                <p>No film locations found for &quot;{searchTerm}&quot;.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
