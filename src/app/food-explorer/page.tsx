
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UtensilsCrossed, Gem, Search, Star, MapIcon, View } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { foodItems } from '@/lib/food-images';

export default function FoodExplorerPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFood = foodItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
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
                <UtensilsCrossed className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Food Explorer</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Taste the Journey.”
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex w-full max-w-lg mx-auto items-center space-x-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search for dishes, cuisines, or restaurants..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button asChild>
                  <Link href="/food-explorer">Explore Food</Link>
                </Button>
            </div>
            <div className="flex justify-center gap-2 mt-4">
                <Button variant="ghost"><Gem className="mr-2 h-4 w-4"/>Hidden Gems</Button>
                <Button variant="ghost"><MapIcon className="mr-2 h-4 w-4"/>Food Trails</Button>
                <Button variant="ghost"><View className="mr-2 h-4 w-4"/>AR View</Button>
            </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredFood.map(item => (
            <Card key={item.name} className="overflow-hidden shadow-lg group">
                <div className="relative h-48 w-full">
                    <img 
                        src={item.image.imageUrl} 
                        alt={item.name} 
                        data-ai-hint={item.image.imageHint} 
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
                    />
                    <Badge variant={item.type === 'Street Food' ? 'secondary' : (item.type === 'Dessert' ? 'destructive' : 'default')} className="absolute top-2 right-2">{item.type}</Badge>
                </div>
                <CardHeader>
                    <CardTitle className="font-headline">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}/>
                        ))}
                        <span className="text-sm ml-2 text-muted-foreground">({item.rating})</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/food-explorer">View Details & Reviews</Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
         {filteredFood.length === 0 && (
          <Card className="md:col-span-2 lg:col-span-4">
            <CardContent className="p-8 text-center text-muted-foreground">
              <p>No results for &quot;{searchTerm}&quot;.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
