import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {BookOpen, BedDouble, Star, MapPin} from 'lucide-react';
import {PlaceHolderImages} from '@/lib/placeholder-images';

const hotelImages = PlaceHolderImages.filter(img =>
  img.id.startsWith('dest-')
);

const bookings = [
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
];

export default function BookingsPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen /> My Bookings
          </CardTitle>
          <CardDescription>
            Manage your hotel and activity reservations.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {bookings.map(booking => (
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
                  <Badge variant={booking.status === 'Confirmed' ? 'secondary' : 'destructive'} className="bg-green-700 text-white">{booking.status}</Badge>
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
        ))}
      </div>
    </div>
  );
}
