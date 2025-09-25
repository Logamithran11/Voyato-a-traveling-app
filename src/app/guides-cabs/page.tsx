
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Car } from 'lucide-react';
import Link from 'next/link';

export default function GuidesCabsPage() {
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car /> Trusted Guide & Cab Booking
          </CardTitle>
          <CardDescription>
            This feature is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Find and book verified local guides and cab drivers with ratings and multilingual support.</p>
        </CardContent>
      </Card>
    </div>
  );
}
