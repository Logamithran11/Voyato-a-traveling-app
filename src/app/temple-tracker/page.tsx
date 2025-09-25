
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Landmark, Users, Ticket, CheckCircle, Search, Clock } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const temples = [
    { name: "Tirupati Balaji Temple", location: "Andhra Pradesh", crowd: "Heavy", waitTime: "3-4h", image: "https://picsum.photos/seed/tirupati/600/400" },
    { name: "Vaishno Devi Temple", location: "Jammu & Kashmir", crowd: "Moderate", waitTime: "2-3h", image: "https://picsum.photos/seed/vaishno-devi/600/400" },
    { name: "Golden Temple", location: "Amritsar, Punjab", crowd: "Moderate", waitTime: "1-2h", image: "https://picsum.photos/seed/golden-temple/600/400" },
    { name: "Somnath Temple", location: "Gujarat", crowd: "Low", waitTime: "30-45m", image: "https://picsum.photos/seed/somnath/600/400" },
];

const crowdColor = {
    "Low": "bg-green-500",
    "Moderate": "bg-yellow-500",
    "Heavy": "bg-red-500",
};

export default function TempleTrackerPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTemples = temples.filter(temple =>
        temple.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                <Landmark className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Temple Queue & Darshan Tracker</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Smarter Pilgrimage.”
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search for a temple..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button asChild>
                    <Link href="/temple-tracker">Check Temple Status</Link>
                </Button>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        {filteredTemples.map((temple) => (
            <Card key={temple.name} className="overflow-hidden shadow-lg flex flex-col group">
                 <div className="relative h-56 w-full">
                    <Image src={temple.image} alt={temple.name} data-ai-hint="indian temple" fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <CardHeader>
                    <CardTitle className="font-headline">{temple.name}</CardTitle>
                    <CardDescription>{temple.location}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-sm font-semibold">Live Crowd</p>
                            <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${crowdColor[temple.crowd as keyof typeof crowdColor]}`}></div>
                                <span className="text-sm text-muted-foreground">{temple.crowd}</span>
                            </div>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <div>
                            <p className="text-sm font-semibold">Est. Wait Time</p>
                            <p className="text-sm text-muted-foreground">{temple.waitTime}</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="mt-auto">
                    <Button className="w-full" asChild>
                        <Link href="/temple-tracker">
                            <Ticket className="mr-2 h-4 w-4" /> Book E-Darshan
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
         {filteredTemples.length === 0 && (
          <Card className="md:col-span-2">
            <CardContent className="p-8 text-center text-muted-foreground">
              <p>No temples found for &quot;{searchTerm}&quot;.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
