import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function WelcomeBanner() {
  return (
    <Card className="mb-8 border-none bg-gradient-to-r from-card to-background shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
          Welcome back, Traveler!
        </CardTitle>
        <CardDescription className="text-base md:text-lg text-foreground/80 pt-2">
          Ready to plan your next adventure? Let&apos;s find your perfect destination.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
