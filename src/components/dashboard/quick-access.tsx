
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Ticket, 
    BookOpen, 
    FileText, 
    Camera, 
    Map,
    Home,
    Calendar,
    UtensilsCrossed,
    View,
    Languages,
    Film,
    Shield,
    Car,
    AlertTriangle,
    Wallet,
    Landmark,
    Bike,
    Mic,
    ShoppingBag,
    Users,
    Trophy,
    Train,
    Wand2,
    Lightbulb,
    Download,
    Globe
} from "lucide-react";

const quickAccessItems = [
    { label: "Tickets", icon: Ticket, href: "/tickets" },
    { label: "Bookings", icon: BookOpen, href: "/bookings" },
    { label: "Camera", icon: Camera, href: "/camera-spots"},
    { label: "Documents", icon: FileText, href: "/documents" },
    { label: "Travel Guides", icon: FileText, href: "/travel-guides" },
    { label: "State Guides", icon: Map, href: "/state-guides" },
    { label: "Itinerary Planner", icon: Wand2, href: "/everyday-planner" },
    { label: "Transport", icon: Train, href: "/transport" },
    { label: "Offline Maps", icon: Download, href: "/offline-maps" },
    { label: "Village Tourism", icon: Home, href: "/village-tourism" },
    { label: "Events Calendar", icon: Calendar, href: "/events-calendar" },
    { label: "Food Explorer", icon: UtensilsCrossed, href: "/food-explorer" },
    { label: "Heritage AR", icon: View, href: "/heritage-ar" },
    { label: "Translator", icon: Languages, href: "/translator" },
    { label: "Film Locations", icon: Film, href: "/film-locations" },
    { label: "SOS", icon: Shield, href: "/sos" },
    { label: "Guides & Cabs", icon: Car, href: "/guides-cabs" },
    { label: "Smart Alerts", icon: AlertTriangle, href: "/smart-alerts" },
    { label: "Travel Wallet", icon: Wallet, href: "/travel-wallet" },
    { label: "Temple Tracker", icon: Landmark, href: "/temple-tracker" },
    { label: "Eco Travel", icon: Bike, href: "/eco-travel" },
    { label: "Audio Guides", icon: Mic, href: "/audio-guides" },
    { label: "Virtual Shopping", icon: ShoppingBag, href: "/virtual-shopping" },
    { label: "Community Hub", icon: Users, href: "/community-hub" },
    { label: "Gamified Exploration", icon: Trophy, href: "/gamified-exploration" },
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
      <CardContent className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
        {quickAccessItems.map(item => (
            <Button key={item.label} variant="outline" className="flex flex-col h-20 md:h-24 gap-2 text-center" asChild>
                <Link href={item.href}>
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary"/>
                    <span className="text-xs sm:text-sm">{item.label}</span>
                </Link>
            </Button>
        ))}
      </CardContent>
    </Card>
  );
}
