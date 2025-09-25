
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wand2, MapPin, Clock, Wallet, Share2, Edit, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function ItineraryPlannerPage() {
    const highlights = [
        { text: 'Custom by time, budget, weather', icon: Wand2 },
        { text: 'Smart activity suggestions', icon: Lightbulb },
        { text: 'Editable itineraries', icon: Edit },
        { text: 'Share with friends', icon: Share2 },
    ];

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
                <Wand2 className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Smart Itinerary Planner</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Your AI Travel Buddy.”
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          
          <div className="text-center">
            <h3 className="font-semibold text-lg">Why It Matters</h3>
            <p className="text-muted-foreground">Saves time with instant trip planning.</p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg text-center mb-4">Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              {highlights.map((item) => (
                <div key={item.text} className="p-4 bg-muted/50 rounded-lg flex flex-col items-center gap-2">
                  <item.icon className="h-6 w-6 text-primary" />
                  <p className="font-medium text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />
          
          <div>
            <h3 className="font-semibold text-lg text-center mb-4">How It Works</h3>
            <div className="flex items-center justify-center space-x-2 md:space-x-4 text-muted-foreground">
                <div className="flex flex-col items-center text-center">
                    <MapPin className="h-8 w-8 mb-2"/>
                    <span className="font-semibold">1. Select Destination</span>
                </div>
                 <div className="flex-1 border-t-2 border-dashed mx-2"></div>
                <div className="flex flex-col items-center text-center">
                    <div className="flex gap-1"><Clock className="h-8 w-8 mb-2"/><Wallet className="h-8 w-8 mb-2"/></div>
                    <span className="font-semibold">2. Enter Details</span>
                </div>
                 <div className="flex-1 border-t-2 border-dashed mx-2"></div>
                <div className="flex flex-col items-center text-center">
                    <Wand2 className="h-8 w-8 mb-2"/>
                    <span className="font-semibold">3. Get AI Plan</span>
                </div>
            </div>
          </div>

        </CardContent>
        <CardFooter className="justify-center pt-6">
            <Button size="lg" className="w-full max-w-xs" asChild>
                <Link href="/everyday-planner">Plan My Trip</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
