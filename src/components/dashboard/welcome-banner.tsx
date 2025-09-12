
"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useState } from "react";

export function WelcomeBanner() {
  const [userName] = useLocalStorage("userName", "Traveler");
  const [isClient, setIsClient] = useState(false);
  const [displayName, setDisplayName] = useState("Traveler");

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    setIsClient(true);
    setDisplayName(userName);
  }, [userName]);

  return (
    <Card className="mb-8 border-none bg-gradient-to-r from-card to-background shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
          Welcome back, {isClient ? displayName : 'Traveler'}!
        </CardTitle>
        <CardDescription className="text-base md:text-lg text-foreground/80 pt-2">
          Ready to plan your next adventure? Let&apos;s find your perfect destination.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
