import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudSnow } from "lucide-react";

export function WeatherWidget() {
  const weatherData = [
    { day: "Now", temp: "25°C", icon: <Sun className="h-6 w-6 text-yellow-400" /> },
    { day: "3PM", temp: "23°C", icon: <Cloud className="h-6 w-6 text-gray-400" /> },
    { day: "6PM", temp: "20°C", icon: <CloudRain className="h-6 w-6 text-blue-400" /> },
    { day: "9PM", temp: "18°C", icon: <CloudSnow className="h-6 w-6 text-sky-300" /> },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
            Real-time Weather
        </CardTitle>
        <CardDescription>
            Forecast for Tokyo, Japan
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
            {weatherData.map(weather => (
                <div key={weather.day} className="flex flex-col items-center gap-2">
                    <span className="text-sm text-muted-foreground">{weather.day}</span>
                    {weather.icon}
                    <span className="font-semibold">{weather.temp}</span>
                </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}