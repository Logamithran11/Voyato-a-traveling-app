import data from './food-images.json';

export type FoodItem = {
  name: string;
  type: string;
  rating: number;
  image: string;
  imageHint: string;
};

export const foodItems: FoodItem[] = data.foodItems;
