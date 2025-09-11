
"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useState } from "react";

export function WelcomeBanner() {
  const [userName, setUserName] = useLocalStorage("userName", "Traveler");
  const [isClient, setIsClient] = useState(false);
  const [displayName, setDisplayName] = useState("Traveler");

  useEffect(() => {
    setIsClient(true);
    // Even if isClient is true, userName might not be immediately available
    // from useLocalStorage on first render.
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setDisplayName(JSON.parse(storedUserName));
    }
  }, []);

  useEffect(() => {
    // This effect ensures that if the userName from the hook updates,
    // the display name is also updated.
    if (userName && userName !== "Traveler") {
        setDisplayName(userName);
    }
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
