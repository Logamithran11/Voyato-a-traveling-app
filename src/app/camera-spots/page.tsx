import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Camera } from "lucide-react";

export default function CameraSpotsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera /> Camera Spots
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This is where you can find and save camera spots. This page is currently a placeholder.
        </p>
      </CardContent>
    </Card>
  );
}
