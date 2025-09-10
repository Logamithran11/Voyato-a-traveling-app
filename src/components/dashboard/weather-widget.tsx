"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sun, Cloud, CloudRain, CloudSnow, Loader2, Search } from "lucide-react";
import { getWeatherForecast, WeatherForecast } from "@/ai/flows/get-weather-forecast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const weatherIcons: { [key: string]: React.ReactNode } = {
  "Sunny": <Sun className="h-6 w-6 text-yellow-400" />,
  "Clear": <Sun className="h-6 w-6 text-yellow-400" />,
  "Partly Cloudy": <Cloud className="h-6 w-6 text-gray-400" />,
  "Cloudy": <Cloud className="h-6 w-6 text-gray-400" />,
  "Rain": <CloudRain className="h-6 w-6 text-blue-400" />,
  "Snow": <CloudSnow className="h-6 w-6 text-sky-300" />,
  "Showers": <CloudRain className="h-6 w-6 text-blue-400" />,
};


export function WeatherWidget() {
  const [city, setCity] = useState("Tokyo, Japan");
  const [weatherData, setWeatherData] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if(!city) {
        setError("Please enter a city name.");
        return;
    }
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
        const result = await getWeatherForecast({ city });
        setWeatherData(result);
    } catch (err) {
        setError("Could not fetch weather data. Please try again.");
        console.error(err);
    } finally {
        setLoading(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl md:text-2xl">
            Real-time Weather
        </CardTitle>
        <CardDescription>
            AI-powered forecast for any city.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
            <Input 
                placeholder="Enter city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
            />
            <Button onClick={fetchWeather} disabled={loading} size="icon">
                {loading ? <Loader2 className="h-4 w-4 animate-spin"/> : <Search className="h-4 w-4"/>}
            </Button>
        </div>

        {error && (
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        
        {weatherData ? (
            <div>
                 <p className="text-sm text-muted-foreground mb-4">Forecast for {weatherData.city}</p>
                <div className="flex justify-between items-center">
                    {weatherData.forecast.slice(0, 4).map(weather => (
                        <div key={weather.time} className="flex flex-col items-center gap-2 text-center">
                            <span className="text-sm text-muted-foreground">{weather.time}</span>
                            {weatherIcons[weather.condition] || <Cloud className="h-6 w-6 text-gray-400" />}
                            <span className="font-semibold">{weather.temp}</span>
                        </div>
                    ))}
                </div>
            </div>
        ) : !loading && (
            <p className="text-sm text-muted-foreground text-center">Enter a city to see the weather.</p>
        )}

      </CardContent>
    </Card>
  );
}
