import { Props, Controls } from './types';
import './BuildControls.scss';
import { Ingredients } from '../Burger/BurgerIngredient/types';
import { IngredientsToBuildOf } from '../../containers/BurgerBuilder/types';
import BuildControl from '../BuildControl/index';
import { useState, useEffect } from 'react';
import { RootState } from '../../store/reducers/types';
import { useSelector } from 'react-redux';

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

  const [purchesable, setPurchesable] = useState(false);
  useEffect(() => {
    setPurchesable(
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
        disabled={!purchesable}
        onClick={handleOrderBtnClick}
      >
        {isAuthenticated ? 'Order Now' : 'Sign up to order'}
      </button>
    </div>
  );
};

export default BuildControls;
