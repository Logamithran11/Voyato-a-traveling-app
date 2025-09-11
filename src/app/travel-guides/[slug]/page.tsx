
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Share2, Wand2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { customizeTravelGuide } from '@/ai/flows/customize-travel-guide';
import { useToast } from '@/hooks/use-toast';

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
  const title = useMemo(() => decodeURIComponent(params.slug).replace(/-/g, ' '), [params.slug]);

  const [isCustomizeDialogOpen, setCustomizeDialogOpen] = useState(false);
  const [customizationRequest, setCustomizationRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [guideContent, setGuideContent] = useState(guideData.content);
  const { toast } = useToast();


  const handleCustomize = async () => {
    if (!customizationRequest) return;
    setLoading(true);
    try {
      const result = await customizeTravelGuide({
        guideTitle: title,
        originalContent: guideContent,
        customizationRequest,
      });
      setGuideContent(result.customizedContent);
      setCustomizeDialogOpen(false);
      setCustomizationRequest("");
      toast({
        title: "Guide Customized!",
        description: "Your travel guide has been updated with your preferences.",
      })
    } catch (error) {
        console.error("Failed to customize guide:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Sorry, we couldn't customize the guide. Please try again.",
        });
    } finally {
      setLoading(false);
    }
  };


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
             <Button onClick={() => setCustomizeDialogOpen(true)}>
                <Wand2 className="mr-2 h-4 w-4" />
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
            dangerouslySetInnerHTML={{ __html: guideContent }}
          />
        </CardContent>
      </Card>

      <Dialog open={isCustomizeDialogOpen} onOpenChange={setCustomizeDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><Wand2 className="text-primary"/>Customize Your Guide</DialogTitle>
                <DialogDescription>
                    Tell our AI how you'd like to personalize this guide for '{title}'.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <Textarea
                    placeholder="e.g., 'Make it suitable for a family with young children', 'Focus on budget-friendly food options', 'I only have 2 days, what are the absolute must-sees?'"
                    className="min-h-[120px]"
                    value={customizationRequest}
                    onChange={(e) => setCustomizationRequest(e.target.value)}
                />
            </div>
            <DialogFooter>
                <Button variant="ghost" onClick={() => setCustomizeDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCustomize} disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                            Customizing...
                        </>
                    ) : "Generate"}
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
