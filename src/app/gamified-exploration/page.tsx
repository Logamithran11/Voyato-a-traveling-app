
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Badge as BadgeIcon, BarChart, Gift, MapPin, CheckCircle, User, Award } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const challenges = [
    { title: "Visit 5 Forts in Rajasthan", points: 200, progress: 60, icon: MapPin },
    { title: "Try 10 Different Street Foods", points: 150, progress: 80, icon: CheckCircle },
    { title: "Attend a Local Festival", points: 100, progress: 0, icon: Gift },
];

const leaderboard = [
    { rank: 1, name: "Priya Patel", points: 5280, avatar: "https://picsum.photos/seed/leader1/40/40" },
    { rank: 2, name: "Alex Doe", points: 4850, avatar: "https://picsum.photos/seed/user-avatar/40/40" },
    { rank: 3, name: "Ravi Sharma", points: 4500, avatar: "https://picsum.photos/seed/leader3/40/40" },
];

export default function GamifiedExplorationPage() {

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                        <Trophy className="h-8 w-8" />
                    </div>
                    <CardTitle className="font-headline text-3xl pt-4">Gamified Exploration</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground pt-2">
                    “Travel. Play. Win.”
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Ongoing Challenges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {challenges.map((challenge, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-center mb-1">
                                <p className="font-semibold flex items-center gap-2"><challenge.icon className="h-4 w-4 text-primary"/>{challenge.title}</p>
                                <p className="text-sm font-bold text-primary">+{challenge.points}pts</p>
                            </div>
                            <Progress value={challenge.progress} />
                        </div>
                    ))}
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>My Badges</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    <div className="flex flex-col items-center gap-2 p-2 rounded-md bg-muted/50">
                        <BadgeIcon className="h-10 w-10 text-yellow-500" />
                        <span className="text-xs font-medium">Foodie Explorer</span>
                    </div>
                     <div className="flex flex-col items-center gap-2 p-2 rounded-md bg-muted/50">
                        <Trophy className="h-10 w-10 text-slate-400" />
                        <span className="text-xs font-medium">Fort Conqueror</span>
                    </div>
                     <div className="flex flex-col items-center gap-2 p-2 rounded-md bg-muted/50">
                        <Award className="h-10 w-10 text-orange-500" />
                        <span className="text-xs font-medium">Culture Vulture</span>
                    </div>
                </CardContent>
            </Card>
        </div>
        
        <div className="space-y-8">
            <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-2"><User /> My Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                        <AvatarImage src="https://picsum.photos/seed/user-avatar/80/80" alt="Alex Doe" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold text-lg">Alex Doe</p>
                    <p className="text-sm text-muted-foreground">Level 12 Explorer</p>
                    <p className="text-2xl font-bold mt-2">4,850 <span className="text-base font-normal text-primary">Points</span></p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart /> Leaderboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {leaderboard.map(player => (
                        <div key={player.rank} className={`flex items-center gap-3 p-2 rounded-md ${player.rank === 2 ? 'bg-primary/10' : ''}`}>
                            <span className="font-bold text-lg w-6">{player.rank}</span>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={player.avatar} alt={player.name} />
                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="flex-grow font-medium text-sm">{player.name}</p>
                            <p className="font-semibold text-sm">{player.points}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
