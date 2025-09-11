
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Wand2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { customizeTravelGuide } from '@/ai/flows/customize-travel-guide';
import { useToast } from '@/hooks/use-toast';

interface GuideData {
    title: string;
    author: string;
    date: string;
    content: string;
}

interface TravelGuideClientPageProps {
    guideData: GuideData;
}

export function TravelGuideClientPage({ guideData }: TravelGuideClientPageProps) {
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
        guideTitle: guideData.title,
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

  const handleShare = async () => {
    const shareData = {
      title: guideData.title,
      text: `Check out this amazing travel guide for ${guideData.title}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({
            title: "Guide shared successfully!",
        });
      } catch (err) {
        // Silently fail if user cancels the share dialog
        if ((err as Error).name !== 'AbortError') {
            console.error("Failed to share:", err);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Could not share the guide.",
            });
        }
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: "Link Copied!",
          description: "The guide URL has been copied to your clipboard.",
        });
      } catch (err) {
        console.error("Failed to copy link:", err);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not copy the link to the clipboard.",
        });
      }
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
            <Button variant="outline" size="icon" onClick={handleShare}>
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
          <CardTitle className="font-headline text-3xl md:text-4xl capitalize">{guideData.title}</CardTitle>
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
                    Tell our AI how you'd like to personalize this guide for '{guideData.title}'.
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
