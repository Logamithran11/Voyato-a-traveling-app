
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UtensilsCrossed, Gem, Search, Star, MapIcon, View } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const foodItems = [
  { name: "Pani Puri", type: "Street Food", rating: 4.5, image: "https://images.unsplash.com/photo-1626779307983-52382645b244?q=80&w=600&auto=format&fit=crop", imageHint: "pani puri" },
  { name: "Vada Pav", type: "Street Food", rating: 4.8, image: "https://images.unsplash.com/photo-1607330264227-4655e09e11a9?q=80&w=600&auto=format&fit=crop", imageHint: "vada pav" },
  { name: "Fish Thali", type: "Restaurant", rating: 4.6, image: "https://images.unsplash.com/photo-1626781414995-1f95a55097b5?q=80&w=600&auto=format&fit=crop", imageHint: "fish thali" },
  { name: "Chicken Biryani", type: "Restaurant", rating: 4.4, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop", imageHint: "chicken biryani" },
  { name: "Masala Dosa", type: "Restaurant", rating: 4.7, image: "https://images.unsplash.com/photo-1668665782397-39695679a943?q=80&w=600&auto=format&fit=crop", imageHint: "masala dosa" },
  { name: "Chole Bhature", type: "Street Food", rating: 4.6, image: "https://images.unsplash.com/photo-1606495147816-a3c332924424?q=80&w=600&auto=format&fit=crop", imageHint: "chole bhature" },
  { name: "Galouti Kebab", type: "Restaurant", rating: 4.9, image: "https://images.unsplash.com/photo-1625944022799-4917627bb34c?q=80&w=600&auto=format&fit=crop", imageHint: "galouti kebab" },
  { name: "Jalebi with Rabri", type: "Dessert", rating: 4.8, image: "https://images.unsplash.com/photo-1610970878459-a2ea8883e35c?q=80&w=600&auto=format&fit=crop", imageHint: "jalebi dessert" },
];

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
                    <Image src={item.image} alt={item.name} data-ai-hint={item.imageHint} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
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
