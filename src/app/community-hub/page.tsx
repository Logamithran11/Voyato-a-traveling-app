
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users } from 'lucide-react';
import Link from 'next/link';

export default function CommunityHubPage() {
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
            <Users /> Tourist Community Hub
          </CardTitle>
          <CardDescription>
            This feature is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Share itineraries, reviews, and connect with other travelers for group trips.</p>
        </CardContent>
      </Card>
    </div>
  );
}
