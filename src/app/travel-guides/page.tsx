
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
import {Button} from '@/components/ui/button';
import {FileText, Globe, Search} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {PlaceHolderImages} from '@/lib/placeholder-images';
import { slugify } from '@/lib/utils';
import { useState } from 'react';

const guideImages = PlaceHolderImages.filter(img =>
  img.id.startsWith('dest-')
);

const allGuides = [
  {
    title: 'Tokyo: A 5-Day Itinerary',
    description:
      "Explore the best of Tokyo, from ancient temples to futuristic skyscrapers.",
    image: guideImages[0],
  },
  {
    title: 'Kyoto\'s Hidden Gems',
    description:
      'Discover serene gardens, traditional tea houses, and the spirit of old Japan.',
    image: guideImages[1],
  },
  {
    title: 'The Ultimate Guide to Paris',
    description:
      'Experience the city of love with our comprehensive guide to its art, food, and culture.',
    image: guideImages[3],
  },
  {
    title: 'Exploring the Amalfi Coast',
    description: 'A breathtaking journey through Italy\'s most stunning coastline.',
    image: guideImages[4],
  },
  {
    title: 'New York City on a Budget',
    description: 'How to enjoy the Big Apple without breaking the bank.',
    image: guideImages[2]
  },
  {
    title: 'Adventure in the Swiss Alps',
    description: 'Hiking, skiing, and breathtaking views await in Switzerland.',
    image: { ...PlaceHolderImages.find(img => img.id === 'dest-1'), imageUrl: 'https://picsum.photos/seed/alps/600/400', imageHint: 'mountain snow' },
  },
  {
    title: 'A Culinary Tour of Rome',
    description: 'From pasta to gelato, taste the authentic flavors of the Eternal City.',
    image: { ...PlaceHolderImages.find(img => img.id === 'dest-2'), imageUrl: 'https://picsum.photos/seed/rome-food/600/400', imageHint: 'italian pasta' },
  },
  {
    title: 'The Jungles of Costa Rica',
    description: 'Discover the rich biodiversity, from toucans to monkeys, in this tropical paradise.',
    image: { ...PlaceHolderImages.find(img => img.id === 'dest-3'), imageUrl: 'https://picsum.photos/seed/costa-rica/600/400', imageHint: 'jungle toucan' },
  },
  {
    title: 'Historic Wonders of Egypt',
    description: 'Journey down the Nile and uncover the secrets of the pharaohs.',
    image: { ...PlaceHolderImages.find(img => img.id === 'dest-4'), imageUrl: 'https://picsum.photos/seed/egypt/600/400', imageHint: 'pyramids desert' },
  }
];


export default function TravelGuidesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGuides = allGuides.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe /> AI Travel Guides
          </CardTitle>
          <CardDescription>
            Your personalized travel handbooks for any destination.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-lg items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for a destination..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGuides.map(guide => (
          <Card key={guide.title} className="overflow-hidden shadow-lg flex flex-col">
            <div className="relative h-48 w-full">
              <Image
                src={guide.image.imageUrl}
                alt={guide.title}
                data-ai-hint={guide.image.imageHint}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="flex-grow">
              <CardTitle className="font-headline">{guide.title}</CardTitle>
              <CardDescription className="pt-2">{guide.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href={`/travel-guides/${slugify(guide.title)}`}>Read Guide</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
         {filteredGuides.length === 0 && (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardContent className="p-8 text-center text-muted-foreground">
              <p>No travel guides found for &quot;{searchTerm}&quot;.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
