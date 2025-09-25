
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

export default function SOSPage() {
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
            <Shield /> Women Safety SOS
          </CardTitle>
          <CardDescription>
            This feature is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This page will contain an emergency SOS button with GPS tracking and integration with the nearest police station/hospital.</p>
        </CardContent>
      </Card>
    </div>
  );
}
