import { render, screen } from '@testing-library/react';
import Burger from '../components/Burger';

describe('Tests for Burger component', () => {
  test('burger is displayed - no ingredients selected - should display empty burger sign', () => {
    render(
      <Burger ingredients={{ Bacon: 0, Cheese: 0, Meat: 0, Salad: 0, Seeds1: 1, Seeds2: 1 }} />
    );
    const helloElement = screen.getByText('Please start adding ingredients');

    expect(helloElement).toBeTruthy();
  });

  test('burger is displayed - cheese, meat and ham are selected - all selected ingredients are displayed and no empty sign', () => {});
});
