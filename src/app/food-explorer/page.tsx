
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

export default function FoodExplorerPage() {
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
            <UtensilsCrossed /> Food Explorer
          </CardTitle>
          <CardDescription>
            This feature is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Discover regional cuisines, street food, and food trails with ratings and AR-based restaurant menus.</p>
        </CardContent>
      </Card>
    </div>
  );
}
