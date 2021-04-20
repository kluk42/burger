import {Props, Controls} from './types';
import './BuildControls.scss';
import {Ingredients} from '../Burger/BurgerIngredient/types';
import BuildControl from '../BuildControl/index';

const controls: Controls = [
    {
        label: Ingredients.Bacon,
    },
    {
        label: Ingredients.Cheese,
    },
    {
        label: Ingredients.Salad,
    },
    {
        label: Ingredients.Meat,
    },
]

const BuildControls: Props = ({ingredientAdded, ingredientRemoved, ingredients, price, purchesable, handleOrderBtnClick}) => {
    return (
        <div className="BuildControls">
            <p>Current price: <strong>{price.toFixed(2)}</strong></p>
            {controls.map(ctrl => <BuildControl
                                    key={ctrl.label}
                                    label={ctrl.label}
                                    added={() => ingredientAdded(ctrl.label)}
                                    removed={() => ingredientRemoved(ctrl.label)}
                                    removeDisabled={ingredients[ctrl.label] ? false : true}
                                />
                                )}
            <button className="BuildControls__orderBtn" disabled={!purchesable} onClick={handleOrderBtnClick}>Order Now</button>
        </div>
    )
}

export default BuildControls;
