import { useSelector } from 'react-redux';
import { calculateTotalPrice } from '../../helpers/calculateTotalPrice';
import { IngredientsToBuildOf } from '../../hooks/useIngredients/types';
import { RootState } from '../../infrastructure/store/slices/types';
import Button from '../Button/index';
import { Theme } from '../Button/types';
import './OrderSummary.scss';
import { Props } from './types';

const OrderSummary: Props = ({ handleCnclClick, handleCntnClick }) => {
  const ingredientsFromStore = useSelector((state: RootState) => state.burgerBuilder.ingredients);

  const ingredientSummary = Object.keys(ingredientsFromStore).map((igKey, ind) => (
    <li key={igKey}>
      <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:
      {ingredientsFromStore[igKey as keyof IngredientsToBuildOf]}
    </li>
  ));
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout?</p>
      <p>
        <strong>Total Price: {calculateTotalPrice(ingredientsFromStore)}</strong>
      </p>
      <Button onClick={handleCnclClick} theme={Theme.Danger}>
        Cancel
      </Button>
      <Button onClick={handleCntnClick} theme={Theme.Success}>
        Continue
      </Button>
    </>
  );
};

export default OrderSummary;
