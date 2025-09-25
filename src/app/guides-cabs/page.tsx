
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Car, Star, Languages, Shield, Search, User } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const guides = [
    { id: 1, name: "Sanjay Singh", location: "Jaipur", languages: ["English", "Hindi"], rating: 4.8, type: "Guide", image: "https://picsum.photos/seed/guide1/100/100" },
    { id: 2, name: "Priya Sharma", location: "Agra", languages: ["English", "French"], rating: 4.9, type: "Guide", image: "https://picsum.photos/seed/guide2/100/100" },
];

const cabs = [
    { id: 3, name: "Rajesh Kumar", location: "Goa", languages: ["English", "Konkani"], rating: 4.7, type: "Cab", image: "https://picsum.photos/seed/cab1/100/100", vehicle: "SUV" },
    { id: 4, name: "Anil Desai", location: "Mumbai", languages: ["English", "Marathi"], rating: 4.6, type: "Cab", image: "https://picsum.photos/seed/cab2/100/100", vehicle: "Sedan" },
];

const renderProfileCard = (profile: any) => (
    <Card key={profile.id}>
        <CardContent className="p-4 flex items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src={profile.image} alt={profile.name} />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{profile.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> {profile.rating}
                    </div>
                </div>
                <CardDescription>{profile.location}</CardDescription>
                <div className="flex flex-wrap gap-1 mt-2">
                    {profile.languages.map((lang: string) => <Badge key={lang} variant="outline">{lang}</Badge>)}
                    {profile.vehicle && <Badge variant="secondary">{profile.vehicle}</Badge>}
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full">View Profile & Book</Button>
        </CardFooter>
    </Card>
);

export default function GuidesCabsPage() {
    const [location, setLocation] = useState('');

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
                <Car className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Trusted Guide & Cab Booking</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Travel with Confidence.”
            </CardDescription>
        </CardHeader>
        <CardContent>
             <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Enter your destination city..."
                        className="pl-10"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <Button>Search</Button>
            </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="guides" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="guides" className="flex gap-2"><User/> Guides</TabsTrigger>
            <TabsTrigger value="cabs" className="flex gap-2"><Car/> Cabs</TabsTrigger>
        </TabsList>
        <TabsContent value="guides" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
                {guides.map(renderProfileCard)}
            </div>
        </TabsContent>
        <TabsContent value="cabs" className="mt-6">
             <div className="grid md:grid-cols-2 gap-6">
                {cabs.map(renderProfileCard)}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
