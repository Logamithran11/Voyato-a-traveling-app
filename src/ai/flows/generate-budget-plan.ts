
'use server';

/**
 * @fileOverview An AI agent that generates a personalized travel budget plan.
 *
 * - generateBudgetPlan - A function that generates a budget plan.
 * - GenerateBudgetPlanInput - The input type for the generateBudgetPlan function.
 * - GenerateBudgetPlanOutput - The return type for the generateBudgetPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBudgetPlanInputSchema = z.object({
  destination: z.string().describe('The travel destination.'),
  duration: z.number().describe('The duration of the trip in days.'),
  numberOfMembers: z.number().describe('The number of people traveling.'),
  travelStyle: z.string().describe('The user\'s travel style (e.g., budget, mid-range, luxury).'),
  vehicle: z.string().describe('The primary mode of transportation (e.g., Car, Bus, Aeroplane, Train, Bike, None).'),
  currency: z.string().describe('The currency for the budget (e.g., USD, EUR, INR).'),
});
export type GenerateBudgetPlanInput = z.infer<typeof GenerateBudgetPlanInputSchema>;

const GenerateBudgetPlanOutputSchema = z.object({
  totalBudget: z.number().describe('The estimated total budget for the trip.'),
  budgetBreakdown: z.array(
    z.object({
      category: z.string().describe('The budget category (e.g., Accommodation, Food, Activities, Transport).'),
      amount: z.number().describe('The estimated amount for this category.'),
      percentage: z.number().describe('The percentage of the total budget for this category.'),
    })
  ),
  tips: z.array(z.string()).describe('A list of budget-saving tips for the trip.'),
});
export type GenerateBudgetPlanOutput = z.infer<typeof GenerateBudgetPlanOutputSchema>;

export async function generateBudgetPlan(
  input: GenerateBudgetPlanInput
): Promise<GenerateBudgetPlanOutput> {
  return generateBudgetPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBudgetPlanPrompt',
  input: {schema: GenerateBudgetPlanInputSchema},
  output: {schema: GenerateBudgetPlanOutputSchema},
  prompt: `You are a travel finance expert. Your goal is to create a personalized budget plan for a user's trip.

  Given the following trip details:
  - Destination: {{destination}}
  - Duration: {{duration}} days
  - Number of Members: {{numberOfMembers}}
  - Travel Style: {{travelStyle}}
  - Primary Transportation: {{vehicle}}
  - Currency: {{currency}}

  Generate a detailed budget plan. The plan should be calculated for the total number of members ({{numberOfMembers}}). The plan should include:
  1. An estimated total budget in the specified currency ({{currency}}).
  2. A breakdown of the budget into major categories (e.g., Accommodation, Food, Activities, Transport, Shopping, Miscellaneous). The 'Transport' category should reflect the chosen vehicle: {{vehicle}}.
  3. A list of actionable budget-saving tips relevant to the destination and travel style.

  Ensure the output is a valid JSON object matching the provided schema. The sum of all category percentages should be 100.
  `,
});

const generateBudgetPlanFlow = ai.defineFlow(
  {
    name: 'generateBudgetPlanFlow',
    inputSchema: GenerateBudgetPlanInputSchema,
    outputSchema: GenerateBudgetPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
