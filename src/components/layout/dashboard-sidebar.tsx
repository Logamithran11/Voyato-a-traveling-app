"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  Map,
  Lightbulb,
  FileText,
  Camera,
  Settings,
  PanelLeft,
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
  { href: "/dashboard", label: "Itinerary Planner", icon: Map },
  { href: "/dashboard", label: "AI Recommendations", icon: Lightbulb },
  { href: "/dashboard", label: "Documents", icon: FileText },
  { href: "/dashboard", label: "Camera Spots", icon: Camera },
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
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
                pathname === item.href && item.label === "Dashboard"
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
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
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
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
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
              </nav>
            </SheetContent>
          </Sheet>
      </header>
    </>
  );
}
