'use server';

/**
 * @fileOverview An AI agent that recommends personalized travel destinations based on user preferences,
 *  including highlighting interesting camera spots.
 *
 * - generateDestinationRecommendations - A function that generates destination recommendations.
 * - GenerateDestinationRecommendationsInput - The input type for the generateDestinationRecommendations function.
 * - GenerateDestinationRecommendationsOutput - The return type for the generateDestinationRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDestinationRecommendationsInputSchema = z.object({
  preferences: z
    .string()
    .describe(
      'A description of the user travel preferences including desired activities, budget, travel style, and interests.'
    ),
});
export type GenerateDestinationRecommendationsInput = z.infer<
  typeof GenerateDestinationRecommendationsInputSchema
>;

const GenerateDestinationRecommendationsOutputSchema = z.object({
  destinations: z.array(
    z.object({
      name: z.string().describe('The name of the destination.'),
      description: z.string().describe('A short description of the destination.'),
      cameraSpots: z
        .array(z.string())
        .describe('A list of interesting camera spots at the destination.'),
    })
  ),
});
export type GenerateDestinationRecommendationsOutput = z.infer<
  typeof GenerateDestinationRecommendationsOutputSchema
>;

export async function generateDestinationRecommendations(
  input: GenerateDestinationRecommendationsInput
): Promise<GenerateDestinationRecommendationsOutput> {
  return generateDestinationRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDestinationRecommendationsPrompt',
  input: {schema: GenerateDestinationRecommendationsInputSchema},
  output: {schema: GenerateDestinationRecommendationsOutputSchema},
  prompt: `You are a travel expert who recommends personalized travel destinations based on user preferences.

  Given the following user preferences:
  {{preferences}}

  Recommend a few destinations that match these preferences. For each destination, provide a short description and highlight interesting camera spots.

  Format your output as a JSON array of destinations, each with a name, description, and cameraSpots array.
  `,
});

const generateDestinationRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateDestinationRecommendationsFlow',
    inputSchema: GenerateDestinationRecommendationsInputSchema,
    outputSchema: GenerateDestinationRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
