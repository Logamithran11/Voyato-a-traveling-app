
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mic, Play, Pause, SkipForward, Volume2, Search, MapPin } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

const guideImages = PlaceHolderImages.filter(img => img.id.startsWith('dest-'));

const podcastSeries = [
  {
    id: 1,
    title: "Myths of Old Goa",
    author: "Goa Historians",
    episodes: 5,
    image: guideImages[0]
  },
  {
    id: 2,
    title: "Legends of the Taj Mahal",
    author: "Agra Storytellers",
    episodes: 3,
    image: guideImages[1]
  },
  {
    id: 3,
    title: "Echoes of Hampi",
    author: "Karnataka Tourism",
    episodes: 8,
    image: guideImages[2]
  },
  {
    id: 4,
    title: "Folklore of the French Quarter",
    author: "Puducherry Archives",
    episodes: 4,
    image: guideImages[3]
  }
];

export default function AudioGuidesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  
  const filteredSeries = podcastSeries.filter(series =>
    series.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Mic className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-3xl pt-4">Storytelling Podcasts</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            “Hear the Stories of Places.”
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for audio guides..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        {filteredSeries.map(series => (
          <Card key={series.id} className="overflow-hidden shadow-lg flex flex-col">
              <div className="relative h-48 w-full">
                  <Image
                      src={series.image.imageUrl}
                      alt={series.title}
                      data-ai-hint={series.image.imageHint}
                      fill
                      className="object-cover"
                  />
              </div>
              <CardHeader>
                  <CardTitle className="font-headline">{series.title}</CardTitle>
                  <CardDescription>{series.author} - {series.episodes} episodes</CardDescription>
              </CardHeader>
              <CardFooter>
                  <Button className="w-full" asChild>
                      <Link href="/audio-guides">
                        <Play className="mr-2 h-4 w-4" />
                        Listen Now
                      </Link>
                  </Button>
              </CardFooter>
          </Card>
        ))}
      </div>

      {/* Player sticky at bottom */}
      <Card className="fixed bottom-0 left-0 right-0 z-50 rounded-t-lg border-t shadow-2xl mx-auto max-w-4xl">
        <CardContent className="p-4 flex items-center gap-4">
            <Image src={guideImages[0].imageUrl} alt="Current podcast" width={64} height={64} className="rounded-md w-16 h-16 object-cover" />
            <div className="flex-grow">
              <h3 className="font-semibold">Whispers of the Basilica</h3>
              <p className="text-sm text-muted-foreground">Myths of Old Goa</p>
              <Slider defaultValue={[33]} max={100} step={1} className="mt-2" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              <Button variant="ghost" size="icon">
                <SkipForward className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <Volume2 className="h-6 w-6" />
              </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
