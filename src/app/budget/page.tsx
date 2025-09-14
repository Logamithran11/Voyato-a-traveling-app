
"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wallet, Wand2, Loader2, Lightbulb, PieChart, Tag, ArrowLeft } from "lucide-react";
import {
  generateBudgetPlan,
  GenerateBudgetPlanOutput,
} from "@/ai/flows/generate-budget-plan";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Pie,
  Cell,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Tooltip
} from "recharts";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00c49f"];

const CURRENCY_SYMBOLS: { [key: string]: string } = {
    "USD": "$",
    "EUR": "€",
    "JPY": "¥",
    "GBP": "£",
    "INR": "₹",
};

export default function BudgetPage() {
  const [destination, setDestination] = useState("Goa, India");
  const [duration, setDuration] = useState(7);
  const [travelStyle, setTravelStyle] = useState("mid-range");
  const [currency, setCurrency] = useState("INR");

  const [budgetPlan, setBudgetPlan] = useState<GenerateBudgetPlanOutput | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateBudget = async () => {
    if (!destination || !duration) {
      setError("Please fill in all the fields.");
      return;
    }
    setLoading(true);
    setError(null);
    setBudgetPlan(null);

    try {
      const result = await generateBudgetPlan({
        destination,
        duration,
        travelStyle,
        currency,
      });
      setBudgetPlan(result);
    } catch (err: any) {
        if (err.message && err.message.includes('503')) {
            setError("The AI service is currently overloaded. Please try again in a few moments.");
        } else {
            setError("Sorry, we couldn't generate a budget plan. Please try again.");
        }
        console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const currencySymbol = CURRENCY_SYMBOLS[currency] || currency;

  return (
    <div className="space-y-8">
       <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2 text-xl md:text-2xl">
            <Wand2 className="text-primary" />
            AI Budget Planner
          </CardTitle>
          <CardDescription>
            Let our AI create a personalized budget for your next trip.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="e.g., Paris, France"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="e.g., 7"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="travel-style">Travel Style</Label>
              <Select
                value={travelStyle}
                onValueChange={setTravelStyle}
              >
                <SelectTrigger id="travel-style">
                  <SelectValue placeholder="Select your style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="mid-range">Mid-range</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={currency}
                onValueChange={setCurrency}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleGenerateBudget} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Budget"
              )}
            </Button>
        </CardFooter>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {budgetPlan && (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-xl md:text-2xl">Your Budget Plan</CardTitle>
                <CardDescription>
                    Estimated total for a {duration}-day trip to {destination} ({travelStyle}):
                    <span className="font-bold text-primary text-lg"> {currencySymbol}{budgetPlan.totalBudget.toLocaleString()}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-8">
                <div className="md:col-span-2 h-64">
                {budgetPlan.budgetBreakdown && budgetPlan.budgetBreakdown.length > 0 && (
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                        <Pie
                            data={budgetPlan.budgetBreakdown}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="amount"
                            nameKey="category"
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                return (
                                  <text x={x} y={y} fill="currentColor" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                    {`${(percent * 100).toFixed(0)}%`}
                                  </text>
                                );
                              }}
                        >
                            {budgetPlan.budgetBreakdown.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${currencySymbol}${value.toLocaleString()}`} />
                        </RechartsPieChart>
                    </ResponsiveContainer>
                )}
                </div>
                <div className="md:col-span-3 space-y-4">
                    <h3 className="font-semibold flex items-center gap-2"><Tag className="text-primary"/>Budget Breakdown</h3>
                    <div className="space-y-2">
                        {budgetPlan.budgetBreakdown.map((item, index) => (
                            <div key={item.category} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}/>
                                    <span>{item.category}</span>
                                </div>
                                <span className="font-medium">{currencySymbol}{item.amount.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                     <Separator />
                     <div className="flex justify-between items-center font-bold">
                        <span>Total</span>
                        <span>{currencySymbol}{budgetPlan.totalBudget.toLocaleString()}</span>
                     </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
                <h3 className="font-semibold flex items-center gap-2"><Lightbulb className="text-primary"/>Budget-Saving Tips</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    {budgetPlan.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                    ))}
                </ul>
            </CardFooter>
        </Card>
      )}

      {!budgetPlan && !loading && (
        <Card className="flex flex-col items-center justify-center text-center p-8 shadow-lg">
            <CardHeader>
                <Wallet className="h-16 w-16 mx-auto text-muted-foreground" />
                <CardTitle className="font-headline text-xl md:text-2xl mt-4">Generate Your Travel Budget</CardTitle>
                <CardDescription>
                    Fill out the form above to get a personalized budget plan for your trip.
                </CardDescription>
            </CardHeader>
        </Card>
      )}
    </div>
  );
}
