
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar as CalendarIcon, Filter, Ticket, MapPin, Search } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import Image from 'next/image';

const allEvents = [
    {
        id: 1,
        name: "Pushkar Camel Fair",
        location: "Pushkar, Rajasthan",
        dates: Array.from({ length: 9 }, (_, i) => new Date(2024, 10, i + 1)), // Nov 1-9
        category: "Fair",
        image: { imageUrl: "https://picsum.photos/seed/pushkar/600/400", imageHint: "camels desert" }
    },
    {
        id: 2,
        name: "Hornbill Festival",
        location: "Kohima, Nagaland",
        dates: Array.from({ length: 10 }, (_, i) => new Date(2024, 11, i + 1)), // Dec 1-10
        category: "Cultural",
        image: { imageUrl: "https://picsum.photos/seed/hornbill/600/400", imageHint: "tribal festival" }
    },
    {
        id: 3,
        name: "Rath Yatra",
        location: "Puri, Odisha",
        dates: [new Date(2024, 6, 7)], // July 7
        category: "Religious",
        image: { imageUrl: "https://picsum.photos/seed/rath-yatra/600/400", imageHint: "chariot festival" }
    },
    {
        id: 4,
        name: "Diwali",
        location: "Varanasi, Uttar Pradesh",
        dates: [new Date(2024, 10, 1)], // Nov 1
        category: "Religious",
        image: { imageUrl: "https://picsum.photos/seed/diwali/600/400", imageHint: "lamps river" }
    },
     {
        id: 5,
        name: "Ganesh Chaturthi",
        location: "Mumbai, Maharashtra",
        dates: [new Date(2024, 8, 7)], // Sep 7
        category: "Religious",
        image: { imageUrl: "https://picsum.photos/seed/ganesh/600/400", imageHint: "ganesha statue" }
    },
    {
        id: 6,
        name: "Onam",
        location: "Kerala",
        dates: Array.from({ length: 10 }, (_, i) => new Date(2024, 8, i + 5)), // Sep 5-14
        category: "Harvest",
        image: { imageUrl: "https://picsum.photos/seed/onam/600/400", imageHint: "flower carpet" }
    },
    {
        id: 7,
        name: "Holi",
        location: "Mathura, Uttar Pradesh",
        dates: [new Date(2025, 2, 14)], // Mar 14, 2025
        category: "Cultural",
        image: { imageUrl: "https://picsum.photos/seed/holi/600/400", imageHint: "color festival" }
    },
    {
        id: 8,
        name: "Durga Puja",
        location: "Kolkata, West Bengal",
        dates: Array.from({ length: 5 }, (_, i) => new Date(2024, 9, i + 9)), // Oct 9-13
        category: "Religious",
        image: { imageUrl: "https://picsum.photos/seed/durgapuja/600/400", imageHint: "goddess statue" }
    },
    {
        id: 9,
        name: "Kumbh Mela",
        location: "Prayagraj, Uttar Pradesh",
        dates: Array.from({ length: 45 }, (_, i) => new Date(2025, 0, i + 14)), // Jan 14 - Feb 26, 2025
        category: "Religious",
        image: { imageUrl: "https://picsum.photos/seed/kumbh/600/400", imageHint: "pilgrims river" }
    },
    {
        id: 10,
        name: "Bihu",
        location: "Assam",
        dates: [new Date(2025, 0, 15), new Date(2025, 3, 14), new Date(2025, 9, 15)], // Multiple dates
        category: "Harvest",
        image: { imageUrl: "https://picsum.photos/seed/bihu/600/400", imageHint: "folk dance" }
    },
     {
        id: 11,
        name: "Goa Carnival",
        location: "Panjim, Goa",
        dates: Array.from({ length: 4 }, (_, i) => new Date(2025, 1, i + 22)), // Feb 22-25, 2025
        category: "Cultural",
        image: { imageUrl: "https://picsum.photos/seed/goa-carnival/600/400", imageHint: "carnival float parade" }
    },
];

const allStates = [
    "All States", "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];
const allMonths = ["All Months", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function EventsCalendarPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterState, setFilterState] = useState('All States');
    const [filterMonth, setFilterMonth] = useState('All Months');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    const filteredEvents = allEvents.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterState === 'All States' || event.location.includes(filterState)) &&
        (filterMonth === 'All Months' || event.dates.some(d => d.toLocaleString('default', { month: 'long' }) === filterMonth))
    );
    
    // Correctly prepare dates for the calendar modifier by removing the time part.
    const allEventDays = allEvents.flatMap(event => event.dates).map(d => {
        const date = new Date(d);
        date.setHours(0, 0, 0, 0);
        return date;
    });
    
    const eventsOnSelectedDate = selectedDate ? allEvents.filter(event => 
      event.dates.some(d => d.toDateString() === selectedDate.toDateString())
    ) : [];

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
                <CardHeader>
                    <div className='flex justify-between items-start'>
                        <div>
                            <CardTitle className="font-headline text-3xl flex items-center gap-2">
                               <CalendarIcon className="h-8 w-8 text-primary" /> Festival & Events Calendar
                            </CardTitle>
                            <CardDescription className="pt-2 text-lg">“Celebrate with Locals.”</CardDescription>
                        </div>
                         <Button asChild>
                           <Link href="/events-calendar">View Events</Link>
                         </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                     <p>Never miss unique festivals. This feature provides state/month filters, ticket booking links, notifications, and cultural notes.</p>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">How it works:</p>
                        <p className="text-sm text-muted-foreground">Select month/state → See events → Save to itinerary.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Filter /> Filters</CardTitle>
                        </CardHeader>
                        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                    {allStates.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Select value={filterMonth} onValueChange={(value) => {
                                setFilterMonth(value);
                                if (value !== "All Months") {
                                    const monthIndex = allMonths.indexOf(value) - 1;
                                    setSelectedDate(new Date(selectedDate?.getFullYear() ?? new Date().getFullYear(), monthIndex, 1));
                                }
                            }}>
                                <SelectTrigger><SelectValue placeholder="Filter by Month" /></SelectTrigger>
                                <SelectContent>
                                    {allMonths.map(month => <SelectItem key={month} value={month}>{month}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </CardContent>
                        <CardContent className="flex justify-center">
                           <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                month={selectedDate}
                                onMonthChange={(month) => setSelectedDate(month)}
                                className="rounded-md border"
                                modifiers={{ event: allEventDays }}
                                modifiersStyles={{
                                    event: {
                                        border: "2px solid hsl(var(--primary))",
                                        borderRadius: '50%',
                                    },
                                    selected: {
                                         backgroundColor: "hsl(var(--primary))",
                                         color: "hsl(var(--primary-foreground))",
                                         borderRadius: '50%',
                                    }
                                }}
                            />
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Events on {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : 'selected date'}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {eventsOnSelectedDate.length > 0 ? (
                                eventsOnSelectedDate.map(event => (
                                    <Card key={event.id} className="overflow-hidden shadow-sm">
                                         <div className="relative h-32 w-full">
                                            <Image
                                                src={event.image.imageUrl}
                                                alt={event.name}
                                                data-ai-hint={event.image.imageHint}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <CardHeader className="p-3">
                                            <CardTitle className="text-md">{event.name}</CardTitle>
                                            <CardDescription className="text-xs flex items-center gap-1"><MapPin className="h-3 w-3"/>{event.location}</CardDescription>
                                        </CardHeader>
                                        <CardFooter className="p-3">
                                            <Button size="sm" className="w-full" asChild>
                                                <Link href="/events-calendar">
                                                    <Ticket className="mr-2 h-4 w-4" /> Book
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center p-4">No events scheduled for this day.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
