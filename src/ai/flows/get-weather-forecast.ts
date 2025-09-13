'use server';

/**
 * @fileOverview An AI agent that provides a weather forecast for a given city.
 * 
 * - getWeatherForecast - A function that returns a weather forecast.
 * - GetWeatherForecastInput - The input type for the getWeatherForecast function.
 * - WeatherForecast - The return type for the getWeatherForecast function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GetWeatherForecastInputSchema = z.object({
  city: z.string().describe('The city for which to get the weather forecast.'),
  currentTime: z.string().describe('The current time in HH:MM format.'),
});
export type GetWeatherForecastInput = z.infer<typeof GetWeatherForecastInputSchema>;

const WeatherForecastSchema = z.object({
  city: z.string().describe('The city name, corrected for any typos.'),
  forecast: z.array(
    z.object({
      time: z.string().describe("The time for the forecast entry (e.g., 'Now', '3PM', '6PM')."),
      temp: z.string().describe("The temperature in Celsius, including the symbol (e.g., '25°C')."),
      condition: z.string().describe("The weather condition. Use 'Sunny' for clear daytime, 'Clear' for clear nighttime, 'Partly Cloudy', 'Cloudy', 'Rain', 'Showers', or 'Snow'."),
    })
  ).describe('An array of 4-6 forecast entries for the next 12 hours.'),
});
export type WeatherForecast = z.infer<typeof WeatherForecastSchema>;

export async function getWeatherForecast(
  input: Omit<GetWeatherForecastInput, 'currentTime'>
): Promise<WeatherForecast> {
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  return getWeatherForecastFlow({...input, currentTime });
}

const prompt = ai.definePrompt({
  name: 'getWeatherForecastPrompt',
  input: { schema: GetWeatherForecastInputSchema },
  output: { schema: WeatherForecastSchema },
  prompt: `You are a weather forecasting AI. Given a city name and the current time, provide a plausible weather forecast for the next 12 hours. 
  
  City: {{city}}
  Current Time: {{currentTime}}
  
  Generate 4-6 forecast entries, starting from "Now" and then using relative times like "in 2 hours" or specific times like "3PM".
  The weather conditions must be one of: "Sunny", "Clear", "Partly Cloudy", "Cloudy", "Rain", "Showers", "Snow".
  - Use "Sunny" for clear conditions during typical daylight hours (e.g., 6 AM to 7 PM).
  - Use "Clear" for clear conditions during typical nighttime hours (e.g., 7 PM to 6 AM).
  Temperatures must be in Celsius and the response string must include the degree symbol and 'C' (e.g., "25°C").
  `,
});

const getWeatherForecastFlow = ai.defineFlow(
  {
    name: 'getWeatherForecastFlow',
    inputSchema: GetWeatherForecastInputSchema,
    outputSchema: WeatherForecastSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
