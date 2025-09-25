
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Languages } from 'lucide-react';
import Link from 'next/link';

export default function TranslatorPage() {
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
            <Languages /> Local Language Translator
          </CardTitle>
          <CardDescription>
            This feature is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Get quick translations and voice assistance for various Indian languages.</p>
        </CardContent>
      </Card>
    </div>
  );
}
