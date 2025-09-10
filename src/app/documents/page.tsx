import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function DocumentsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText /> Documents
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This is where you can manage your travel documents. This page is currently a placeholder.
        </p>
      </CardContent>
    </Card>
  );
}
