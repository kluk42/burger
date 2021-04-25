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

        const isBurgerEmpty = !Object.keys(ingredients)
            .some(i => ingredients[i as keyof IngredientsToBuildOf]>0 && i!==Ingredients.SeedsOne && i!==Ingredients.SeedsTwo);

        const emptyIngsSign = <p>Please start adding ingredients</p>
    return (
        <div className="Burger">
            <BurgerIngredient type={Ingredients.BreadTop}/>
            {isBurgerEmpty ? emptyIngsSign : transFormedIngredients}
            <BurgerIngredient type={Ingredients.BreadBottom}/>
        </div>
    )
}

export default Burger;
