
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  generateDestinationRecommendations,
  GenerateDestinationRecommendationsOutput,
} from "@/ai/flows/generate-destination-recommendations";
import { Loader2, Camera, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const destImages = PlaceHolderImages.filter((img) => img.id.startsWith("dest-"));

export function Recommendations() {
  const [preferences, setPreferences] = useState("A quiet beach vacation with good food and opportunities for photography.");
  const [recommendations, setRecommendations] =
    useState<GenerateDestinationRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferences) return;
    setLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result = await generateDestinationRecommendations({ preferences });
      setRecommendations(result);
    } catch (err: any) {
      if (err.message && err.message.includes('503')) {
        setError("The AI service is currently overloaded. Please try again in a few moments.");
      } else {
        setError("Sorry, we couldn't generate recommendations. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2 text-xl md:text-2xl">
            <Wand2 className="text-primary"/>
            AI Destination Recommendations
        </CardTitle>
        <CardDescription>
          Tell us your travel dreams, and our AI will find the perfect spots for
          you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="e.g., 'A weekend trip to a vibrant city with historical sites and a great food scene, on a budget.'"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Find My Destination"
            )}
          </Button>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {recommendations && (
          <div className="mt-8 space-y-6">
            <h3 className="font-headline text-lg md:text-xl">Your Personalized Suggestions:</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {recommendations.destinations.map((dest, index) => (
                <Card key={dest.name} className="flex flex-col overflow-hidden">
                    <div className="relative h-48 w-full">
                        <Image
                            src={destImages[index % destImages.length]?.imageUrl || `https://picsum.photos/seed/${dest.name}/600/400`}
                            alt={dest.name}
                            data-ai-hint="travel destination"
                            fill
                            className="object-cover"
                        />
                    </div>
                  <CardHeader>
                    <CardTitle className="font-headline">{dest.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{dest.description}</p>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-4">
                     <h4 className="font-semibold flex items-center gap-2 text-sm">
                        <Camera className="h-4 w-4 text-primary" />
                        Camera Spots
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {dest.cameraSpots.map((spot) => (
                            <Badge key={spot} variant="secondary">{spot}</Badge>
                        ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
