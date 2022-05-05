import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IngredientsToBuildOf } from '../../containers/BurgerBuilder/types';
import { RootState } from '../../infrastructure/store/slices/types';
import BuildControl from '../BuildControl/index';
import { Ingredients } from '../Burger/BurgerIngredient/types';
import './BuildControls.scss';
import { Controls, Props } from './types';

const controls: Controls = [
  Ingredients.Bacon,
  Ingredients.Cheese,
  Ingredients.Salad,
  Ingredients.Meat,
];

const BuildControls: Props = ({ handleOrderBtnClick }) => {
  const ingredientsFromStore = useSelector((state: RootState) => state.burgerBuilder.ingredients);
  const price = useSelector((state: RootState) => state.burgerBuilder.totalPrice);
  const isAuthenticated = !!useSelector((state: RootState) => state.auth.token);
  const [purchasable, setPurchasable] = useState(false);

  useEffect(() => {
    setPurchasable(
      Object.keys(ingredientsFromStore).some(
        ing =>
          ingredientsFromStore[ing as keyof IngredientsToBuildOf] > 0 &&
          ing !== Ingredients.SeedsOne &&
          ing !== Ingredients.SeedsTwo
      )
    );
  }, [ingredientsFromStore]);

  return (
    <div className="BuildControls">
      <p>
        Current price: <strong>{price.toFixed(2)}</strong>
      </p>
      {controls.map(label => (
        <BuildControl key={label} label={label} />
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
