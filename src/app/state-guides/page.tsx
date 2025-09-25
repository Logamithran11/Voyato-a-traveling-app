
"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Book, Download, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

const states = [
    { name: "Goa", image: "https://picsum.photos/seed/goa-guide/600/400", imageHint: "beach sunset" },
    { name: "Rajasthan", image: "https://picsum.photos/seed/rajasthan-guide/600/400", imageHint: "desert fort" },
    { name: "Kerala", image: "https://picsum.photos/seed/kerala-guide/600/400", imageHint: "backwaters houseboat" },
    { name: "Himachal Pradesh", image: "https://picsum.photos/seed/himachal-guide/600/400", imageHint: "snowy mountains" },
    { name: "Karnataka", image: "https://picsum.photos/seed/karnataka-guide/600/400", imageHint: "ancient temple ruins" },
    { name: "Sikkim", image: "https://picsum.photos/seed/sikkim-guide/600/400", imageHint: "mountain monastery" },
];


export default function StateGuidesPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStates = states.filter(state =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                <Book className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">State-wise Travel Guides</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Explore Every State Like a Local.”
            </CardDescription>
        </CardHeader>
        <CardContent>
             <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
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
          <Card key={state.name} className="overflow-hidden shadow-lg flex flex-col group">
            <div className="relative h-56 w-full">
              <Image
                src={state.image}
                alt={state.name}
                data-ai-hint={state.imageHint}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
               <h3 className="absolute bottom-4 left-4 font-headline text-2xl text-white">{state.name}</h3>
            </div>
            <CardFooter className="p-4 mt-auto bg-muted/50">
              <Button className="w-full" asChild>
                <Link href="#">View Guide</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        {filteredStates.length === 0 && (
          <Card className="md:col-span-2 lg:col-span-3">
            <CardContent className="p-8 text-center text-muted-foreground">
              <p>No states found for &quot;{searchTerm}&quot;.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
