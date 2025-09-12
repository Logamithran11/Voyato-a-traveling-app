
"use client";

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, MapPin, Search, ArrowLeft } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const hotelImages = PlaceHolderImages.filter(img =>
  img.id.startsWith('dest-')
);

const allBookings = [
  {
    id: 1,
    type: 'Hotel',
    name: 'The Tokyo Grand Hotel',
    location: 'Tokyo, Japan',
    date: 'Oct 28, 2024 - Nov 2, 2024',
    status: 'Confirmed',
    image: hotelImages[0],
    rating: 4,
  },
  {
    id: 2,
    type: 'Activity',
    name: 'Kyoto Cultural Tour',
    location: 'Kyoto, Japan',
    date: 'Nov 3, 2024',
    status: 'Confirmed',
    image: hotelImages[1],
    rating: 5,
  },
  {
    id: 3,
    type: 'Hotel',
    name: 'Osaka Riverside Stay',
    location: 'Osaka, Japan',
    date: 'Nov 5, 2024 - Nov 8, 2024',
    status: 'Pending',
    image: hotelImages[2],
    rating: 4,
  },
  {
    id: 4,
    type: 'Hotel',
    name: 'Parisian Charm Hotel',
    location: 'Paris, France',
    date: 'Dec 10, 2024 - Dec 15, 2024',
    status: 'Confirmed',
    image: hotelImages[3],
    rating: 5,
  },
  {
    id: 5,
    type: 'Activity',
    name: 'Ancient Rome Walking Tour',
    location: 'Rome, Italy',
    date: 'Dec 18, 2024',
    status: 'Cancelled',
    image: { imageUrl: 'https://picsum.photos/seed/rome/600/400', imageHint: 'ancient ruins' },
    rating: 3,
  }
];

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = allBookings.filter(booking => 
    booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.location.toLowerCase().includes(searchTerm.toLowerCase())
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
            <BookOpen /> My Bookings
          </CardTitle>
          <CardDescription>
            Manage your hotel and activity reservations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-lg items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map(booking => (
            <Card key={booking.id} className="grid md:grid-cols-3 overflow-hidden shadow-lg">
              <div className="relative h-48 md:h-full w-full">
                <Image
                  src={booking.image.imageUrl}
                  alt={booking.name}
                  data-ai-hint={booking.image.imageHint}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-2 p-6 flex flex-col">
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <Badge variant={booking.type === 'Hotel' ? 'default' : 'secondary'}>{booking.type}</Badge>
                    <Badge variant={booking.status === 'Confirmed' ? 'secondary' : (booking.status === 'Pending' ? 'destructive' : 'outline')} className={`${booking.status === 'Confirmed' ? 'bg-green-700 text-white' : ''} ${booking.status === 'Cancelled' ? 'bg-red-700 text-white' : ''}`}>{booking.status}</Badge>
                  </div>
                  <h3 className="font-headline text-2xl mt-2">{booking.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{booking.location}</span>
                  </div>
                   <div className="flex items-center gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < booking.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}/>
                      ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">{booking.date}</p>
                </div>
                <div className="flex items-center justify-end gap-2 mt-4">
                  <Button variant="outline">View Details</Button>
                  <Button variant="secondary">Contact Support</Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <p>No bookings found for &quot;{searchTerm}&quot;.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
