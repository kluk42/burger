import {Props} from './types';
import './OrderSummary.scss';
import { IngredientsToBuildOf } from '../../containers/BurgerBuilder/types';
import Button from '../Button/index';
import {Theme} from '../Button/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/types';

const OrderSummary: Props = ({handleCnclClick, handleCntnClick}) => {
    const ingredientsFromStore = useSelector((state: RootState) => state.burgerBuilder.ingredients);
    const total = useSelector((state: RootState) => state.burgerBuilder.totalPrice);

    const ingredientSummary = Object.keys(ingredientsFromStore)
        .map((igKey, ind) => <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>:{ingredientsFromStore[igKey as keyof IngredientsToBuildOf]}</li>)
    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout?</p>
            <p><strong>Total Price: {total.toFixed(2)}</strong></p>
            <Button onClick={handleCnclClick} theme={Theme.Danger}>Cancel</Button>
            <Button onClick={handleCntnClick} theme={Theme.Success}>Continue</Button>
        </>
    )
}

export default OrderSummary;
