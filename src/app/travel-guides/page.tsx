import Image from 'next/image';
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

const guideImages = PlaceHolderImages.filter(img =>
  img.id.startsWith('dest-')
);

const guides = [
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
    image: { imageUrl: 'https://picsum.photos/seed/alps/600/400', imageHint: 'mountain snow' },
  }
];

export default function TravelGuidesPage() {
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
            <Input
              type="text"
              placeholder="Search for a destination..."
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map(guide => (
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
              <Button className="w-full">Read Guide</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
