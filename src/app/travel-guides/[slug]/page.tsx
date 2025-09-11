
import { TravelGuideClientPage } from "@/components/travel-guides/travel-guide-client-page";

// This is a placeholder. In a real app, you would fetch this data based on the slug.
const getGuideData = async (slug: string) => {
    // Decode the slug and replace hyphens with spaces for the title
    const title = decodeURIComponent(slug).replace(/-/g, ' ');
    return {
        title: title,
        author: 'Voyato AI',
        date: 'October 26, 2024',
        content: `
            <p>This is a placeholder for a travel guide for ${title}. In a real application, this content would be dynamically fetched based on the provided slug, likely from a database or a headless CMS.</p>
            <p class="mt-4">The guide would contain detailed information about the destination, including:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>Top attractions and landmarks.</li>
                <li>Recommended restaurants and local cuisine.</li>
                <li>Transportation tips.</li>
                <li>Cultural etiquette and useful phrases.</li>
                <li>Hidden gems and off-the-beaten-path suggestions.</li>
            </ul>
            <p class="mt-4">For now, this page serves as a demonstration of the dynamic routing capabilities of Next.js.</p>
        `
    };
};

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const guideData = await getGuideData(params.slug);

  return (
    <TravelGuideClientPage guideData={guideData} />
  );
}
