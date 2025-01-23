export enum Ingredients {
  SeedsOne = 'Seeds1',
  SeedsTwo = 'Seeds2',
  Meat = 'Meat',
  Cheese = 'Cheese',
  Salad = 'Salad',
  Bacon = 'Bacon',
}
export type IngredientsToBuildOf = Record<`${Ingredients}`, number>;
