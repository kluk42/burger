import { queryAllByAttribute, render, screen } from '@testing-library/react';
import Burger from '../components/Burger';
import { Ingredients } from '../hooks/useIngredients/types';

describe('Tests for Burger component', () => {
  test('burger is displayed - no ingredients selected - should display empty burger sign', () => {
    const container = render(
      <Burger ingredients={{ Bacon: 0, Cheese: 0, Meat: 0, Salad: 0, Seeds1: 1, Seeds2: 1 }} />
    );
    const helloElement = container.getByText('Please start adding ingredients');

    expect(helloElement).toBeTruthy();
  });

  test('burger is displayed - 2 cheese, 1 meat and 1 bacon are selected - all selected ingredients are displayed and no empty sign', () => {
    const container = render(
      <Burger ingredients={{ Bacon: 1, Cheese: 2, Meat: 1, Salad: 0, Seeds1: 1, Seeds2: 1 }} />
    );

    const cheeseElements = queryAllByAttribute('className', rendered., Ingredients.Cheese)
  });
});
