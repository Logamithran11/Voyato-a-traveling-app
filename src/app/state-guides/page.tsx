
"use client";

import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Map, ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { slugify } from '@/lib/utils';
import { useState } from 'react';

const allStates = [
  {
    name: 'Goa',
    description: 'Famous for its beaches, vibrant nightlife, and Portuguese-influenced architecture.',
    imageUrl: 'https://picsum.photos/seed/goa/600/400',
    imageHint: 'beach sunset'
  },
  {
    name: 'Rajasthan',
    description: 'The land of kings, known for its majestic forts, palaces, and rich cultural heritage.',
    imageUrl: 'https://picsum.photos/seed/rajasthan/600/400',
    imageHint: 'desert fort'
  },
  {
    name: 'Kerala',
    description: 'God\'s Own Country, with its serene backwaters, lush greenery, and tranquil beaches.',
    imageUrl: 'https://picsum.photos/seed/kerala/600/400',
    imageHint: 'houseboat backwaters'
  },
  {
    name: 'Himachal Pradesh',
    description: 'Home to scenic mountain towns, snow-capped peaks, and thrilling trekking routes.',
    imageUrl: 'https://picsum.photos/seed/himachal/600/400',
    imageHint: 'himalayan mountains'
  },
  {
    name: 'Karnataka',
    description: 'A blend of ancient heritage, modern cities, and stunning natural landscapes.',
    imageUrl: 'https://picsum.photos/seed/karnataka/600/400',
    imageHint: 'ancient temple'
  },
  {
    name: 'Maharashtra',
    description: 'Known for the bustling city of Mumbai, historic caves, and picturesque hill stations.',
    imageUrl: 'https://picsum.photos/seed/maharashtra/600/400',
    imageHint: 'city skyline'
  },
  {
    name: 'Tamil Nadu',
    description: 'Land of temples, classical dance, and delicious Chettinad cuisine.',
    imageUrl: 'https://picsum.photos/seed/tamilnadu/600/400',
    imageHint: 'temple architecture'
  },
  {
    name: 'West Bengal',
    description: 'The cultural heart of India, famous for Kolkata, the Sundarbans, and Darjeeling tea.',
    imageUrl: 'https://picsum.photos/seed/westbengal/600/400',
    imageHint: 'tram city'
  },
  {
    name: 'Gujarat',
    description: 'Rich in history with ancient sites, vibrant festivals like Navratri, and unique wildlife.',
    imageUrl: 'https://picsum.photos/seed/gujarat/600/400',
    imageHint: 'colorful textiles'
  }
];

export default function StateGuidesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = allStates.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Map /> State-wise Travel Guides
          </CardTitle>
          <CardDescription>
            Curated travel guides for each state, covering culture, festivals, food, and hidden spots.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-lg items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for a state..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStates.map(state => (
          <Card key={state.name} className="overflow-hidden shadow-lg flex flex-col">
            <div className="relative h-48 w-full">
              <Image
                src={state.imageUrl}
                alt={state.name}
                data-ai-hint={state.imageHint}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="flex-grow">
              <CardTitle className="font-headline">{state.name}</CardTitle>
              <CardDescription className="pt-2">{state.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href={`/travel-guides/${slugify(state.name)}`}>Explore Guide</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
         {filteredStates.length === 0 && (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardContent className="p-8 text-center text-muted-foreground">
              <p>No state guides found for &quot;{searchTerm}&quot;.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
