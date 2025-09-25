
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wand2, MapPin, Clock, Wallet, Share2, Edit, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ItineraryDay = ({ day, title, activities, onAddActivity, onRemoveActivity }: { day: number, title: string, activities: {id: number, time: string, text: string}[], onAddActivity: (day: number) => void, onRemoveActivity: (day: number, activityId: number) => void }) => (
    <Card>
        <CardHeader>
            <CardTitle>Day {day}: {title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {activities.map(activity => (
                <div key={activity.id} className="flex items-center gap-4 p-2 rounded-md bg-muted/50">
                    <div className="font-semibold text-sm w-20">{activity.time}</div>
                    <div className="flex-grow text-sm">{activity.text}</div>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onRemoveActivity(day, activity.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground"/>
                    </Button>
                </div>
            ))}
             <Button variant="outline" className="w-full mt-2" onClick={() => onAddActivity(day)}>
                <Plus className="mr-2 h-4 w-4" /> Add Activity
            </Button>
        </CardContent>
    </Card>
);


export default function ItineraryPlannerPage() {
    
    const [itinerary, setItinerary] = useState([
        {
            day: 1,
            title: "Arrival and Old Goa Exploration",
            activities: [
                { id: 1, time: "09:00 AM", text: "Arrive at Goa Airport (GOI), pick up rental car" },
                { id: 2, time: "11:00 AM", text: "Check-in to hotel in Panjim" },
                { id: 3, time: "01:00 PM", text: "Lunch at a local Goan restaurant" },
                { id: 4, time: "03:00 PM", text: "Visit Basilica of Bom Jesus and Se Cathedral in Old Goa" },
                { id: 5, time: "07:00 PM", text: "Dinner cruise on the Mandovi River" },
            ]
        },
        {
            day: 2,
            title: "North Goa Beaches",
            activities: [
                { id: 6, time: "10:00 AM", text: "Head to Baga Beach for water sports" },
                { id: 7, time: "01:00 PM", text: "Lunch at a beach shack in Calangute" },
                { id: 8, time: "04:00 PM", text: "Explore Anjuna Flea Market (if Wednesday)" },
                { id: 9, time: "07:00 PM", text: "Watch the sunset from Vagator Beach" },
            ]
        }
    ]);

    const handleAddActivity = (day: number) => {
        // In a real app, this would open a dialog to add activity details
        console.log("Add activity to day", day);
        const newActivity = { id: Date.now(), time: "00:00", text: "New Activity" };
        const updatedItinerary = itinerary.map(d => 
            d.day === day ? { ...d, activities: [...d.activities, newActivity] } : d
        );
        setItinerary(updatedItinerary);
    };

    const handleRemoveActivity = (day: number, activityId: number) => {
        const updatedItinerary = itinerary.map(d => 
            d.day === day ? { ...d, activities: d.activities.filter(a => a.id !== activityId) } : d
        );
        setItinerary(updatedItinerary);
    };

    const handleAddDay = () => {
        setItinerary([...itinerary, { day: itinerary.length + 1, title: "New Day", activities: [] }]);
    };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex gap-2">
            <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
            <Button><Wand2 className="mr-2 h-4 w-4" /> Regenerate with AI</Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle className="font-headline text-3xl">Goa Adventure</CardTitle>
                    <CardDescription className="flex items-center gap-4 pt-2">
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4"/> Goa, India</span>
                        <span className="flex items-center gap-1"><Clock className="h-4 w-4"/> 5 Days</span>
                        <span className="flex items-center gap-1"><Wallet className="h-4 w-4"/> Mid-range Budget</span>
                    </CardDescription>
                </div>
                <Button variant="outline" size="icon"><Edit className="h-4 w-4"/></Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-6">
                {itinerary.map(dayPlan => (
                    <ItineraryDay 
                        key={dayPlan.day} 
                        {...dayPlan}
                        onAddActivity={handleAddActivity}
                        onRemoveActivity={handleRemoveActivity}
                    />
                ))}
            </div>
        </CardContent>
        <CardFooter className="justify-center">
            <Button variant="secondary" onClick={handleAddDay}>
                <Plus className="mr-2 h-4 w-4" /> Add Day
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
