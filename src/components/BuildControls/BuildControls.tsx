import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { calculateTotalPrice } from '../../helpers/calculateTotalPrice';
import { Ingredients } from '../../hooks/useIngredients/types';
import { RootState } from '../../infrastructure/store/slices/types';
import BuildControl from '../BuildControl/index';
import './BuildControls.scss';
import { Controls, Props } from './types';

const controls: Controls = [
  Ingredients.Bacon,
  Ingredients.Cheese,
  Ingredients.Salad,
  Ingredients.Meat,
];

const BuildControls: Props = ({
  handleOrderBtnClick,
  ingredients,
  addIngredient,
  subtractIngredient,
}) => {
  const isAuthenticated = !!useSelector((state: RootState) => state.auth.token);
  const [purchasable, setPurchasable] = useState(false);

  useEffect(() => {
    setPurchasable(
      Object.values(Ingredients).some(
        ing => ingredients[ing] > 0 && ing !== Ingredients.SeedsOne && ing !== Ingredients.SeedsTwo
      )
    );
  }, [ingredients]);

  return (
    <div className="BuildControls">
      <p>
        Current price: <strong>{calculateTotalPrice(ingredients)}</strong>
      </p>
      {controls.map(label => (
        <BuildControl
          add={() => addIngredient(label)}
          subtract={() => subtractIngredient(label)}
          amount={ingredients[label]}
          key={label}
          label={label}
        />
      ))}
      <button
        className="BuildControls__orderBtn"
        disabled={!purchasable}
        onClick={handleOrderBtnClick}
      >
        {isAuthenticated ? 'Order Now' : 'Sign up to order'}
      </button>
    </div>
  );
};

export default BuildControls;
