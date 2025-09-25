

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  CheckSquare,
  Lightbulb,
  FileText,
  Camera,
  Settings,
  PanelLeft,
  Wallet,
  Ticket,
  BookOpen,
  LogOut,
  Map,
  Download,
  Globe,
  UtensilsCrossed,
  View,
  Languages,
  Film,
  Shield,
  Car,
  AlertTriangle,
  Landmark,
  Bike,
  Mic,
  ShoppingBag,
  Users,
  Trophy,
  Calendar
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Logo } from "../logo";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/everyday-planner", label: "Everyday Planner", icon: CheckSquare },
  { href: "/recommendations", label: "AI Recommendations", icon: Lightbulb },
  { href: "/budget", label: "Budget", icon: Wallet },
  { href: "/tickets", label: "Tickets", icon: Ticket },
  { href: "/bookings", label: "Bookings", icon: BookOpen },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/camera-spots", label: "Camera Spots", icon: Camera },
  { href: "/travel-guides", label: "Travel Guides", icon: FileText },
  { href: "/state-guides", label: "State Guides", icon: Map },
  { href: "/offline-maps", label: "Offline Maps", icon: Download },
  { href: "/explore-maps", label: "Explore Maps", icon: Globe },
  { href: "/village-tourism", label: "Village Tourism", icon: Home },
  { href: "/events-calendar", label: "Events Calendar", icon: Calendar },
  { href: "/food-explorer", label: "Food Explorer", icon: UtensilsCrossed },
  { href: "/heritage-ar", label: "Heritage AR", icon: View },
  { href: "/translator", label: "Translator", icon: Languages },
  { href: "/film-locations", label: "Film Locations", icon: Film },
  { href: "/sos", label: "SOS", icon: Shield },
  { href: "/guides-cabs", label: "Guides & Cabs", icon: Car },
  { href: "/smart-alerts", label: "Smart Alerts", icon: AlertTriangle },
  { href: "/travel-wallet", label: "Travel Wallet", icon: Wallet },
  { href: "/temple-tracker", label: "Temple Tracker", icon: Landmark },
  { href: "/eco-travel", label: "Eco Travel", icon: Bike },
  { href: "/audio-guides", label: "Audio Guides", icon: Mic },
  { href: "/virtual-shopping", label: "Virtual Shopping", icon: ShoppingBag },
  { href: "/community-hub", label: "Community Hub", icon: Users },
  { href: "/gamified-exploration", label: "Gamified Exploration", icon: Trophy },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setSheetOpen(false);
  };

  const navContent = (
    <>
      {menuItems.map((item, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Link
              href={item.href}
              onClick={handleLinkClick}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.label}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      ))}
    </>
  );
  
  const mobileNavContent = (
    <>
        {menuItems.map(item=>(
            <Link
            key={item.label}
            href={item.href}
            onClick={handleLinkClick}
            className={`flex items-center gap-4 px-2.5 hover:text-foreground ${
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
    </>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/dashboard"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Logo />
              <span className="sr-only">Voyato</span>
            </Link>
            {navContent}
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                    pathname === "/settings"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </nav>
        </TooltipProvider>
      </aside>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/dashboard"
                  onClick={handleLinkClick}
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Logo />
                  <span className="sr-only">Voyato</span>
                </Link>
                {mobileNavContent}
                <Link
                    href="/settings"
                    onClick={handleLinkClick}
                    className={`flex items-center gap-4 px-2.5 hover:text-foreground ${
                        pathname === "/settings"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                >
                    <Settings className="h-5 w-5" />
                    Settings
                </Link>
                 <Link
                    href="/"
                    onClick={handleLinkClick}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
      </header>
    </>
  );
}
