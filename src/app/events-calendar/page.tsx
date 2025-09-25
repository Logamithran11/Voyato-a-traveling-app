
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Filter, Ticket, MapPin, Search } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const eventImages = PlaceHolderImages.filter(img => img.id.startsWith('dest-'));

const allEvents = [
    {
        id: 1,
        name: "Pushkar Camel Fair",
        location: "Pushkar, Rajasthan",
        date: "November 1-9, 2024",
        category: "Fair",
        image: { ...eventImages[0], imageUrl: "https://picsum.photos/seed/pushkar/600/400", imageHint: "camels desert" }
    },
    {
        id: 2,
        name: "Hornbill Festival",
        location: "Kohima, Nagaland",
        date: "December 1-10, 2024",
        category: "Cultural",
        image: { ...eventImages[1], imageUrl: "https://picsum.photos/seed/hornbill/600/400", imageHint: "tribal festival" }
    },
    {
        id: 3,
        name: "Rath Yatra",
        location: "Puri, Odisha",
        date: "July 7, 2024",
        category: "Religious",
        image: { ...eventImages[2], imageUrl: "https://picsum.photos/seed/rath-yatra/600/400", imageHint: "chariot festival" }
    },
    {
        id: 4,
        name: "Diwali - Festival of Lights",
        location: "Varanasi, Uttar Pradesh",
        date: "November 1, 2024",
        category: "Religious",
        image: { ...eventImages[3], imageUrl: "https://picsum.photos/seed/diwali/600/400", imageHint: "lamps river" }
    },
];

export default function EventsCalendarPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterState, setFilterState] = useState('all');
    const [filterMonth, setFilterMonth] = useState('all');

    const filteredEvents = allEvents.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterState === 'all' || event.location.toLowerCase().includes(filterState.toLowerCase())) &&
        (filterMonth === 'all' || new Date(event.date.split(',')[0]).toLocaleString('default', { month: 'long' }).toLowerCase() === filterMonth)
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
                <Calendar className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Festival & Events Calendar</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Celebrate with Locals.”
            </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
            <Button asChild>
                <Link href="/events-calendar">View Events</Link>
            </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Filter/> Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search events..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
             <Select value={filterState} onValueChange={setFilterState}>
                <SelectTrigger><SelectValue placeholder="Filter by State" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="nagaland">Nagaland</SelectItem>
                    <SelectItem value="odisha">Odisha</SelectItem>
                    <SelectItem value="uttar pradesh">Uttar Pradesh</SelectItem>
                </SelectContent>
            </Select>
             <Select value={filterMonth} onValueChange={setFilterMonth}>
                <SelectTrigger><SelectValue placeholder="Filter by Month" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    <SelectItem value="july">July</SelectItem>
                    <SelectItem value="november">November</SelectItem>
                    <SelectItem value="december">December</SelectItem>
                </SelectContent>
            </Select>
             <Button className="w-full sm:w-auto" asChild>
                <Link href="/events-calendar">Apply Filters</Link>
             </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredEvents.map(event => (
          <Card key={event.id} className="overflow-hidden shadow-lg flex flex-col">
            <div className="relative h-56 w-full">
                <Image
                    src={event.image.imageUrl}
                    alt={event.name}
                    data-ai-hint={event.image.imageHint}
                    fill
                    className="object-cover"
                />
            </div>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="font-headline text-2xl">{event.name}</CardTitle>
                    <Badge variant="secondary">{event.category}</Badge>
                </div>
                <CardDescription className="flex items-center gap-2 pt-2">
                    <MapPin className="h-4 w-4" /> {event.location}
                </CardDescription>
                 <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> {event.date}
                </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
                <Button className="w-full" asChild>
                    <Link href="/events-calendar">
                        <Ticket className="mr-2 h-4 w-4" /> Book Tickets / View Details
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
         {filteredEvents.length === 0 && (
          <Card className="md:col-span-2">
            <CardContent className="p-8 text-center text-muted-foreground">
              <p>No events found for the selected filters.</p>
            </CardContent>
          </Card>
        )}
      </div>

    </div>
  );
}
