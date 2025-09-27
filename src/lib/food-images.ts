import { PlaceHolderImages, type ImagePlaceholder } from './placeholder-images';

export type FoodItem = {
  name: string;
  type: string;
  rating: number;
  image: ImagePlaceholder;
};

const foodData = [
    { name: "Pani Puri", type: "Street Food", rating: 4.5, imageId: "food-1" },
    { name: "Vada Pav", type: "Street Food", rating: 4.8, imageId: "food-2" },
    { name: "Fish Thali", type: "Restaurant", rating: 4.6, imageId: "food-3" },
    { name: "Chicken Biryani", type: "Restaurant", rating: 4.4, imageId: "food-4" },
    { name: "Masala Dosa", type: "Restaurant", rating: 4.7, imageId: "food-5" },
    { name: "Chole Bhature", type: "Street Food", rating: 4.6, imageId: "food-6" },
    { name: "Galouti Kebab", type: "Restaurant", rating: 4.9, imageId: "food-7" },
    { name: "Jalebi with Rabri", type: "Dessert", rating: 4.8, imageId: "food-8" }
];

export const foodItems: FoodItem[] = foodData.map(item => {
    const imagePlaceholder = PlaceHolderImages.find(p => p.id === item.imageId);
    if (!imagePlaceholder) {
        throw new Error(`Could not find placeholder image with id: ${item.imageId}`);
    }
    return {
        name: item.name,
        type: item.type,
        rating: item.rating,
        image: imagePlaceholder
    };
});
