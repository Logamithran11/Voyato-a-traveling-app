
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListChecks, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

type ItineraryItem = {
  id: number;
  text: string;
};

export function EverydayPlanner() {
  const [items, setItems] = useLocalStorage<ItineraryItem[]>("everyday-planner", []);
  const [newItem, setNewItem] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddItem = () => {
    if (newItem.trim()) {
      setItems([...items, { id: Date.now(), text: newItem.trim() }]);
      setNewItem("");
    }
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2 text-xl md:text-2xl">
            <ListChecks className="text-primary"/>
            Everyday Planner
        </CardTitle>
        <CardDescription>
            Organize your day. Saved locally in your browser.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input 
            placeholder="Add a new plan..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
          />
          <Button onClick={handleAddItem}>Add</Button>
        </div>
        <ScrollArea className="h-48">
            <div className="space-y-2">
            {!isClient ? (
              <div className="space-y-2">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            ) : items.length > 0 ? items.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                    <span className="text-sm">{item.text}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleRemoveItem(item.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground"/>
                    </Button>
                </div>
            )) : (
                <p className="text-sm text-muted-foreground text-center py-4">Your planner is empty. Start planning!</p>
            )}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
