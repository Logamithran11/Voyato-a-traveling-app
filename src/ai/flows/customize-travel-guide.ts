'use server';

/**
 * @fileOverview An AI agent that customizes a travel guide based on user preferences.
 * 
 * - customizeTravelGuide - A function that generates a customized travel guide.
 * - CustomizeTravelGuideInput - The input type for the customizeTravelGuide function.
 * - CustomizeTravelGuideOutput - The return type for the customizeTravelGuide function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CustomizeTravelGuideInputSchema = z.object({
  guideTitle: z.string().describe('The title of the travel guide to be customized.'),
  originalContent: z.string().describe('The original content of the travel guide in HTML format.'),
  customizationRequest: z.string().describe('The user\'s request for customization (e.g., "focus on family-friendly activities", "add more details about historical sites").'),
});
export type CustomizeTravelGuideInput = z.infer<typeof CustomizeTravelGuideInputSchema>;

const CustomizeTravelGuideOutputSchema = z.object({
  customizedContent: z.string().describe('The new, customized content of the travel guide in HTML format.'),
});
export type CustomizeTravelGuideOutput = z.infer<typeof CustomizeTravelGuideOutputSchema>;

export async function customizeTravelGuide(
  input: CustomizeTravelGuideInput
): Promise<CustomizeTravelGuideOutput> {
  return customizeTravelGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customizeTravelGuidePrompt',
  input: { schema: CustomizeTravelGuideInputSchema },
  output: { schema: CustomizeTravelGuideOutputSchema },
  prompt: `You are an expert travel writer. Your task is to customize an existing travel guide based on a user's specific request.

  Guide Title: {{guideTitle}}

  User's Customization Request: "{{customizationRequest}}"

  Original Guide Content (HTML):
  \`\`\`html
  {{{originalContent}}}
  \`\`\`

  Please rewrite and enhance the guide's content to incorporate the user's request. Maintain the HTML structure. For example, if the original content has paragraphs (<p>), lists (<ul>), etc., the new content should also use appropriate HTML tags.

  Do not just append the new information. Integrate the changes naturally into the guide. The output should be a complete, new version of the guide content.

  Generate the 'customizedContent' field in the output.
  `,
});

const customizeTravelGuideFlow = ai.defineFlow(
  {
    name: 'customizeTravelGuideFlow',
    inputSchema: CustomizeTravelGuideInputSchema,
    outputSchema: CustomizeTravelGuideOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
