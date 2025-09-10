import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Ticket } from "lucide-react";

export default function TicketsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ticket /> Tickets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This is where you can manage your tickets. This page is currently a placeholder.
        </p>
      </CardContent>
    </Card>
  );
}
