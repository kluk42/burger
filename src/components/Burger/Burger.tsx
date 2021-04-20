import {Props} from './types';
import './Burger.scss';

import BurgerIngredient from './BurgerIngredient/index';
import {Ingredients} from './BurgerIngredient/types';
import {IngredientsToBuildOf} from '../../containers/BurgerBuilder/types';

const Burger: Props = ({ingredients}) => {
    const transFormedIngredients = Object.keys(ingredients)
        .map(ingKey => {
            return [...Array(ingredients[ingKey as keyof IngredientsToBuildOf])]
            .map((_, index) => {
                return <BurgerIngredient key={ingKey + index} type={ingKey as keyof IngredientsToBuildOf}/>;
            })
        })
        .reduce((acc, current) => {return [...acc, ...current]}, []);
        const emptyIngsSign = <p>Please start adding ingredients</p>
    return (
        <div className="Burger">
            <BurgerIngredient type={Ingredients.BreadTop}/>
            {transFormedIngredients.length === 0 ? emptyIngsSign : transFormedIngredients}
            <BurgerIngredient type={Ingredients.BreadBottom}/>
        </div>
    )
}

export default Burger;
