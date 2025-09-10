import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket, BookOpen, ShieldCheck, FileText } from "lucide-react";

const quickAccessItems = [
    { label: "Tickets", icon: Ticket, href: "#" },
    { label: "Bookings", icon: BookOpen, href: "#" },
    { label: "Documents", icon: ShieldCheck, href: "/documents" },
    { label: "Travel Guides", icon: FileText, href: "#" }
];

export function QuickAccess() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl md:text-2xl">
            Quick Access
        </CardTitle>
        <CardDescription>
            Your essential travel info at a glance.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {quickAccessItems.map(item => (
            <Button key={item.label} variant="outline" className="flex flex-col h-20 md:h-24 gap-2" asChild>
                <Link href={item.href}>
                    <item.icon className="h-6 w-6 text-primary"/>
                    <span className="text-xs md:text-sm">{item.label}</span>
                </Link>
            </Button>
        ))}
      </CardContent>
    </Card>
  );
}
