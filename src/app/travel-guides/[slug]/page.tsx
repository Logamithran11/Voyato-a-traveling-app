
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Share2 } from 'lucide-react';
import Link from 'next/link';

// This is a placeholder. In a real app, you would fetch this data based on the slug.
const guideData = {
    title: 'A Guide to the City',
    author: 'Voyato AI',
    date: 'October 26, 2024',
    content: `
        <p>This is a placeholder for a travel guide. In a real application, this content would be dynamically fetched based on the provided slug, likely from a database or a headless CMS.</p>
        <p class="mt-4">The guide would contain detailed information about the destination, including:</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Top attractions and landmarks.</li>
            <li>Recommended restaurants and local cuisine.</li>
            <li>Transportation tips.</li>
            <li>Cultural etiquette and useful phrases.</li>
            <li>Hidden gems and off-the-beaten-path suggestions.</li>
        </ul>
        <p class="mt-4">For now, this page serves as a demonstration of the dynamic routing capabilities of Next.js.</p>
    `
};

export default function GuidePage({ params }: { params: { slug: string } }) {
  // Decode the slug and replace hyphens with spaces for the title
  const title = decodeURIComponent(params.slug).replace(/-/g, ' ');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="outline" asChild>
          <Link href="/travel-guides">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Guides
          </Link>
        </Button>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
            </Button>
             <Button>
                <Edit className="mr-2 h-4 w-4" />
                Customize with AI
            </Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl md:text-4xl capitalize">{title}</CardTitle>
          <CardDescription>
            By {guideData.author} | Published on {guideData.date}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="prose prose-invert max-w-none text-foreground/90"
            dangerouslySetInnerHTML={{ __html: guideData.content }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
