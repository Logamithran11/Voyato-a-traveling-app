'use server';

/**
 * @fileOverview Summarizes user reviews for a travel spot.
 *
 * - summarizeUserReviews - A function that summarizes user reviews.
 * - SummarizeUserReviewsInput - The input type for the summarizeUserReviews function.
 * - SummarizeUserReviewsOutput - The return type for the summarizeUserReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUserReviewsInputSchema = z.object({
  travelSpotName: z.string().describe('The name of the travel spot.'),
  userReviews: z.string().describe('A string containing all user reviews for the travel spot.'),
});
export type SummarizeUserReviewsInput = z.infer<typeof SummarizeUserReviewsInputSchema>;

const SummarizeUserReviewsOutputSchema = z.object({
  summary: z.string().describe('A short summary of the user reviews.'),
});
export type SummarizeUserReviewsOutput = z.infer<typeof SummarizeUserReviewsOutputSchema>;

export async function summarizeUserReviews(
  input: SummarizeUserReviewsInput
): Promise<SummarizeUserReviewsOutput> {
  return summarizeUserReviewsFlow(input);
}

const summarizeUserReviewsPrompt = ai.definePrompt({
  name: 'summarizeUserReviewsPrompt',
  input: {schema: SummarizeUserReviewsInputSchema},
  output: {schema: SummarizeUserReviewsOutputSchema},
  prompt: `Summarize the following user reviews for {{travelSpotName}}:

  {{userReviews}}
  `,
});

const summarizeUserReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeUserReviewsFlow',
    inputSchema: SummarizeUserReviewsInputSchema,
    outputSchema: SummarizeUserReviewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeUserReviewsPrompt(input);
    return output!;
  }
);
