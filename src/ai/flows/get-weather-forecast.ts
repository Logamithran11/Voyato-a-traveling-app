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
});
export type GetWeatherForecastInput = z.infer<typeof GetWeatherForecastInputSchema>;

const WeatherForecastSchema = z.object({
  city: z.string().describe('The city name, corrected for any typos.'),
  forecast: z.array(
    z.object({
      time: z.string().describe("The time for the forecast entry (e.g., 'Now', '3PM', '6PM')."),
      temp: z.string().describe("The temperature in Celsius (e.g., '25°C')."),
      condition: z.string().describe("The weather condition (e.g., 'Sunny', 'Cloudy', 'Rain', 'Snow')."),
    })
  ).describe('An array of 4-6 forecast entries for the next 12 hours.'),
});
export type WeatherForecast = z.infer<typeof WeatherForecastSchema>;

export async function getWeatherForecast(
  input: GetWeatherForecastInput
): Promise<WeatherForecast> {
  return getWeatherForecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getWeatherForecastPrompt',
  input: { schema: GetWeatherForecastInputSchema },
  output: { schema: WeatherForecastSchema },
  prompt: `You are a weather forecasting AI. Given a city name, provide a plausible weather forecast for the next 12 hours. 
  
  City: {{city}}
  
  Generate 4-6 forecast entries, starting from "Now". 
  The weather conditions should be one of: "Sunny", "Clear", "Partly Cloudy", "Cloudy", "Rain", "Showers", "Snow".
  Temperatures should be in Celsius.
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
