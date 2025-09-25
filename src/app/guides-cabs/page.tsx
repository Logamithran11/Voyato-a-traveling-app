
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Car, Star, Languages, Shield, Search, User } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function GuidesCabsPage() {
    const highlights = [
        { text: 'Profiles with ratings', icon: Star },
        { text: 'Multilingual support', icon: Languages },
        { text: 'Safe booking', icon: Shield },
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
                <Car className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-3xl pt-4">Trusted Guide & Cab Booking</CardTitle>
            <CardDescription className="text-lg text-muted-foreground pt-2">
            “Travel with Confidence.”
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          
          <div className="text-center">
            <h3 className="font-semibold text-lg">Why It Matters</h3>
            <p className="text-muted-foreground">Verified guides & drivers.</p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-lg text-center mb-4">Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
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
                    <Search className="h-8 w-8 mb-2"/>
                    <span className="font-semibold">1. Search Guide/Cab</span>
                </div>
                 <div className="flex-1 border-t-2 border-dashed mx-2"></div>
                <div className="flex flex-col items-center text-center">
                    <User className="h-8 w-8 mb-2"/>
                    <span className="font-semibold">2. View Profiles</span>
                </div>
                 <div className="flex-1 border-t-2 border-dashed mx-2"></div>
                <div className="flex flex-col items-center text-center">
                    <Car className="h-8 w-8 mb-2"/>
                    <span className="font-semibold">3. Book</span>
                </div>
            </div>
          </div>

        </CardContent>
        <CardFooter className="justify-center pt-6">
            <Button size="lg" className="w-full max-w-xs">Find Trusted Guide</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
