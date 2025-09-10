import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { Recommendations } from "@/components/dashboard/recommendations";
import { ItineraryPlanner } from "@/components/dashboard/itinerary-planner";
import { WeatherWidget } from "@/components/dashboard/weather-widget";
import { QuickAccess } from "@/components/dashboard/quick-access";
import { BudgetOverview } from "@/components/dashboard/budget-overview";

export default function DashboardPage() {
  return (
    <>
      <WelcomeBanner />
      <div className="mt-8 grid gap-8 grid-cols-1 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Recommendations />
        </div>
        <div className="space-y-8">
          <BudgetOverview />
          <ItineraryPlanner />
          <WeatherWidget />
          <QuickAccess />
        </div>
      </div>
    </>
  );
}
