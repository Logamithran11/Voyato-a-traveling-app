
import { EverydayPlanner } from "@/components/dashboard/everyday-planner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EverydayPlannerPage() {
  return (
    <div className="w-full space-y-8">
       <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
      <EverydayPlanner />
    </div>
  );
}
