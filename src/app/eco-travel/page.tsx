
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bike, Leaf, Footprints, CarIcon, Award, User, Zap } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const ecoChallenges = [
    { icon: Bike, title: "Cycle 20km", reward: "50 Eco-Points", progress: 75 },
    { icon: Footprints, title: "Walk 10,000 steps", reward: "20 Eco-Points", progress: 40 },
    { icon: CarIcon, title: "Use EV for a day", reward: "100 Eco-Points", progress: 0 },
    { icon: Leaf, title: "Stay at a certified eco-hotel", reward: "80 Eco-Points", progress: 100 },
];

const ecoRentals = [
    { name: "GreenWheels EV", type: "Electric Car", price: "₹2000/day", image: "https://picsum.photos/seed/evcar/600/400" },
    { name: "PedalPower Cycles", type: "Hybrid Bicycle", price: "₹300/day", image: "https://picsum.photos/seed/bicycle/600/400" },
];

export default function EcoTravelPage() {

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
                <Bike className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Eco-Friendly Travel</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Travel Green, Travel Smart.”
            </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
            <Button asChild>
                <Link href="/eco-travel">Go Eco Mode</Link>
            </Button>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Zap /> Eco-Challenges</CardTitle>
                    <CardDescription>Complete challenges to earn points and rewards.</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                    {ecoChallenges.map((challenge, index) => (
                        <Card key={index}>
                            <CardContent className="p-4 flex items-center gap-4">
                                <challenge.icon className="h-8 w-8 text-primary" />
                                <div>
                                    <p className="font-semibold">{challenge.title}</p>
                                    <p className="text-sm text-muted-foreground">{challenge.reward}</p>
                                    <Progress value={challenge.progress} className="mt-2 h-2" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bike /> Green Rentals</CardTitle>
                    <CardDescription>Find sustainable transport options near you.</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                    {ecoRentals.map((rental, index) => (
                         <Card key={index}>
                             <CardContent className="p-4">
                                 <p className="font-semibold">{rental.name}</p>
                                 <p className="text-sm text-muted-foreground">{rental.type}</p>
                                 <p className="font-bold mt-2">{rental.price}</p>
                             </CardContent>
                             <CardFooter>
                                 <Button variant="secondary" className="w-full" asChild>
                                    <Link href="/eco-travel">Book Now</Link>
                                 </Button>
                             </CardFooter>
                         </Card>
                    ))}
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Leaf /> Carbon Footprint</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="text-4xl font-bold">245 <span className="text-lg">kg CO₂</span></div>
                    <p className="text-sm text-muted-foreground mt-1">This Trip</p>
                    <Progress value={65} className="mt-4" />
                    <p className="text-xs text-muted-foreground mt-2">You're doing better than 65% of travelers!</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Award /> Rewards</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-center">
                        <span className="font-bold text-2xl">1,250</span>
                        <span className="text-sm text-muted-foreground"> Eco-Points</span>
                    </p>
                    <div className="space-y-2">
                        <p className="font-semibold text-sm">Available Rewards:</p>
                        <Badge variant="outline">10% off at GreenLeaf Cafe</Badge>
                        <Badge variant="outline">Free 1-hour e-bike rental</Badge>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href="/eco-travel">Redeem Points</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
