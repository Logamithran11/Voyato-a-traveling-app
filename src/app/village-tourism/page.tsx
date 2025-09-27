
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Search, Star } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const homestays = [
  { name: "Riverside Bliss Homestay", village: "Majuli, Assam", rating: 4.8, price: "₹2,500/night", image: "https://picsum.photos/seed/majuli/600/400", imageHint: "bamboo hut river" },
  { name: "Himalayan Orchard Stay", village: "Sethan, Himachal Pradesh", rating: 4.9, price: "₹4,000/night", image: "https://picsum.photos/seed/sethan/600/400", imageHint: "mountain cabin snow" },
  { name: "Backwater Serenity", village: "Kumarakom, Kerala", rating: 4.7, price: "₹3,500/night", image: "https://picsum.photos/seed/kumarakom/600/400", imageHint: "houseboat backwaters" },
  { name: "Desert Rose Homestay", village: "Khuri, Rajasthan", rating: 4.6, price: "₹2,000/night", image: "https://picsum.photos/seed/khuri/600/400", imageHint: "mud hut desert" },
  { name: "Zanskar Valley Homestay", village: "Padum, Ladakh", rating: 4.8, price: "₹3,000/night", image: "https://picsum.photos/seed/zanskar/600/400", imageHint: "remote valley village" },
  { name: "Living Root Bridge View", village: "Nongriat, Meghalaya", rating: 4.9, price: "₹1,800/night", image: "https://picsum.photos/seed/nongriat/600/400", imageHint: "root bridge jungle" },
  { name: "Chettinad Mansion", village: "Kanadukathan, Tamil Nadu", rating: 4.7, price: "₹5,500/night", image: "https://picsum.photos/seed/chettinad/600/400", imageHint: "heritage mansion" },
  { name: "Kumaoni Village Stay", village: "Peora, Uttarakhand", rating: 4.8, price: "₹3,200/night", image: "https://picsum.photos/seed/peora/600/400", imageHint: "stone house mountains" },
];

export default function VillageTourismPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredHomestays = homestays.filter(stay =>
        stay.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stay.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Home className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-3xl pt-4">Village Tourism & Homestays</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            “Live the Village Life.”
          </CardDescription>
        </CardHeader>
         <CardContent>
            <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search for villages or homestays..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredHomestays.map(stay => (
            <Card key={stay.name} className="overflow-hidden shadow-lg group">
                <div className="relative h-56 w-full">
                    <Image src={stay.image} alt={stay.name} data-ai-hint={stay.imageHint} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute top-2 left-2">
                        <Badge>{stay.village}</Badge>
                    </div>
                </div>
                <CardHeader>
                    <CardTitle className="font-headline text-lg">{stay.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                         <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400"/>
                            <span className="text-sm font-semibold">{stay.rating}</span>
                        </div>
                        <p className="font-bold text-lg">{stay.price}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="secondary" className="w-full" asChild>
                        <Link href="/village-tourism">Book Homestay</Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
         {filteredHomestays.length === 0 && (
          <Card className="md:col-span-2 lg:col-span-4">
            <CardContent className="p-8 text-center text-muted-foreground">
              <p>No homestays found for &quot;{searchTerm}&quot;.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
