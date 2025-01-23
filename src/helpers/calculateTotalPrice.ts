import { Ingredients, IngredientsToBuildOf } from '../hooks/useIngredients/types';
export type PurchasableIngredients = Exclude<`${Ingredients}`, 'Seeds1' | 'Seeds2'>;

const purchasableIngredients: PurchasableIngredients[] = [
  Ingredients.Bacon,
  Ingredients.Meat,
  Ingredients.Cheese,
  Ingredients.Salad,
];

const ingredientsPrices: Record<PurchasableIngredients, number> = {
  [Ingredients.Bacon]: 0.7,
  [Ingredients.Meat]: 1.3,
  [Ingredients.Cheese]: 0.4,
  [Ingredients.Salad]: 0.5,
};

const minimalPrice = 4;

export const calculateTotalPrice = (order: IngredientsToBuildOf) =>
  minimalPrice +
  purchasableIngredients.reduce<number>(
    (acc, ingredient) => acc + ingredientsPrices[ingredient] * order[ingredient],
    0
  );
