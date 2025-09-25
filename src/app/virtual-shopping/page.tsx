
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag, Search, Filter, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const products = [
  { name: "Pashmina Shawl", artisan: "Kashmir Weavers", price: 8000, image: "https://picsum.photos/seed/pashmina/600/400", category: "Textiles" },
  { name: "Blue Pottery Vase", artisan: "Jaipur Blue Pottery", price: 2500, image: "https://picsum.photos/seed/bluepottery/600/400", category: "Pottery" },
  { name: "Madhubani Painting", artisan: "Mithila Artists", price: 5000, image: "https://picsum.photos/seed/madhubani/600/400", category: "Art" },
  { name: "Wooden Elephant Statue", artisan: "Kerala Handicrafts", price: 3000, image: "https://picsum.photos/seed/woodenelephant/600/400", category: "Handicrafts" },
];

export default function VirtualShoppingPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                <ShoppingBag className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Virtual Shopping</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Bring Home Local Treasures.”
            </CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search for handicrafts, textiles, art..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-4">
                <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="textiles">Textiles</SelectItem>
                        <SelectItem value="pottery">Pottery</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="handicrafts">Handicrafts</SelectItem>
                    </SelectContent>
                </Select>
                 <Button asChild>
                    <Link href="/virtual-shopping">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Link>
                </Button>
            </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
            <Card key={product.name} className="overflow-hidden shadow-lg group">
                <div className="relative h-56 w-full">
                    <Image src={product.image} alt={product.name} data-ai-hint="handicraft product" fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-background/50 hover:bg-background text-foreground rounded-full h-8 w-8">
                        <Heart className="h-4 w-4" />
                    </Button>
                </div>
                <CardHeader>
                    <CardTitle className="font-headline text-lg truncate">{product.name}</CardTitle>
                    <CardDescription>by {product.artisan}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-xl">₹{product.price.toLocaleString()}</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" asChild>
                        <Link href="/virtual-shopping">Shop Handicrafts</Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
