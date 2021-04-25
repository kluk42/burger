import {Props} from './types';
import './OrderSummary.scss';
import { IngredientsToBuildOf } from '../../containers/BurgerBuilder/types';
import Button from '../Button/index';
import {Theme} from '../Button/types';

const OrderSummary: Props = ({ingredients, handleCnclClick, handleCntnClick, total}) => {
    const ingredientSummary = Object.keys(ingredients)
        .map((igKey, ind) => <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>:{ingredients[igKey as keyof IngredientsToBuildOf]}</li>)
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
