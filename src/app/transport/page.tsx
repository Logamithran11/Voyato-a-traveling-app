
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plane, Train, Bus, Car, Search, Calendar as CalendarIcon, Users } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';


const FlightResult = () => (
    <Card>
        <CardContent className="p-4 grid grid-cols-5 items-center gap-4">
            <div className="col-span-1">
                <p className="font-bold">IndiGo</p>
                <p className="text-xs text-muted-foreground">6E-2045</p>
            </div>
             <div className="col-span-1 text-center">
                <p className="font-semibold text-lg">08:30</p>
                <p className="text-sm">DEL</p>
            </div>
             <div className="col-span-1 text-center">
                <p className="text-sm text-muted-foreground">2h 15m</p>
                <div className="w-full h-px bg-border my-1"></div>
                <p className="text-xs text-muted-foreground">Non-stop</p>
            </div>
            <div className="col-span-1 text-center">
                <p className="font-semibold text-lg">10:45</p>
                <p className="text-sm">BOM</p>
            </div>
            <div className="col-span-1 text-right">
                <p className="font-bold text-xl">₹4,500</p>
                <Button size="sm" className="mt-1" asChild>
                    <Link href="/transport">Book</Link>
                </Button>
            </div>
        </CardContent>
    </Card>
);

export default function TransportPage() {
    const [date, setDate] = useState<Date>();

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
                <div className="flex gap-2"><Plane /><Train /><Bus /></div>
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Multi-Mode Transport Integration</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “All Transport, One App.”
            </CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="grid gap-1.5">
                <Label htmlFor="from">From</Label>
                <Input id="from" placeholder="e.g. Delhi" defaultValue="Delhi (DEL)" />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="to">To</Label>
                <Input id="to" placeholder="e.g. Mumbai" defaultValue="Mumbai (BOM)" />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="date">Departure Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
            </div>
            <Button size="lg" className="h-10" asChild>
                <Link href="/transport"><Search className="mr-2 h-4 w-4"/> Find Transport</Link>
            </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="flights" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="flights" className="flex gap-2"><Plane/> Flights</TabsTrigger>
            <TabsTrigger value="trains" className="flex gap-2"><Train/> Trains</TabsTrigger>
            <TabsTrigger value="buses" className="flex gap-2"><Bus/> Buses</TabsTrigger>
            <TabsTrigger value="cabs" className="flex gap-2"><Car/> Cabs</TabsTrigger>
        </TabsList>
        <TabsContent value="flights" className="mt-6 space-y-4">
            <FlightResult />
            <FlightResult />
        </TabsContent>
         <TabsContent value="trains" className="mt-6">
            <Card><CardContent className="p-8 text-center text-muted-foreground">Train search results will appear here.</CardContent></Card>
        </TabsContent>
         <TabsContent value="buses" className="mt-6">
            <Card><CardContent className="p-8 text-center text-muted-foreground">Bus search results will appear here.</CardContent></Card>
        </TabsContent>
         <TabsContent value="cabs" className="mt-6">
            <Card><CardContent className="p-8 text-center text-muted-foreground">Local cab options will appear here.</CardContent></Card>
        </TabsContent>
      </Tabs>

    </div>
  );
}
