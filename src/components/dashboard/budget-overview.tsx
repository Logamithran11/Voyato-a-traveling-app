
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DollarSign, ArrowRight } from "lucide-react";

export function BudgetOverview() {

  // Dummy data - this would be replaced with real data
  const totalBudget = 5000;
  const spent = 1750;
  const progress = (spent / totalBudget) * 100;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline flex items-center justify-between text-xl md:text-2xl">
            <div className="flex items-center gap-2">
                <DollarSign className="text-primary"/>
                Budget Overview
            </div>
            <Button variant="ghost" size="sm" asChild>
                <Link href="/budget">
                    Details <ArrowRight className="ml-2 h-4 w-4"/>
                </Link>
            </Button>
        </CardTitle>
        <CardDescription>
            Your spending for the current trip.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
            <Progress value={progress} />
            <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">Spent: ${spent.toLocaleString()}</span>
                <span className="text-foreground">Total: ${totalBudget.toLocaleString()}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
