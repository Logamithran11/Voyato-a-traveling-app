
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bike, Leaf, Footprints, Goal } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function EcoTravelPage() {
    const highlights = [
        { text: 'EV rentals', icon: CarIcon },
        { text: 'Walking/cycling tours', icon: Footprints },
        { text: 'Carbon footprint tracker', icon: Leaf },
        { text: 'Earn eco-points', icon: AwardIcon },
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
                <Bike className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Eco-Friendly Travel Mode</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Travel Green.”
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          
          <div className="text-center">
            <h3 className="font-semibold text-lg">Why It Matters</h3>
            <p className="text-muted-foreground">Sustainable & responsible tourism.</p>
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
                    <Leaf className="h-8 w-8 mb-2"/>
                    <span className="font-semibold">1. Select Eco-Mode</span>
                </div>
                 <div className="flex-1 border-t-2 border-dashed mx-2"></div>
                <div className="flex flex-col items-center text-center">
                    <Goal className="h-8 w-8 mb-2"/>
                    <span className="font-semibold">2. View Suggestions</span>
                </div>
                 <div className="flex-1 border-t-2 border-dashed mx-2"></div>
                <div className="flex flex-col items-center text-center">
                    <Bike className="h-8 w-8 mb-2"/>
                    <span className="font-semibold">3. Travel Green</span>
                </div>
            </div>
          </div>

        </CardContent>
        <CardFooter className="justify-center pt-6">
            <Button size="lg" className="w-full max-w-xs">Go Eco Mode</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
const CarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 16.5V14a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v2.5"/><path d="M19 17h2a2 2 0 0 0 2-2v-3.5a3.5 3.5 0 0 0-3.5-3.5H5.5A3.5 3.5 0 0 0 2 11.5V15a2 2 0 0 0 2 2h2"/><circle cx="7" cy="16.5" r="1.5"/><circle cx="17" cy="16.5" r="1.5"/></svg>
);
const AwardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
);
