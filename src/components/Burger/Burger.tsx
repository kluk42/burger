import { useSelector } from 'react-redux';
import { IngredientsToBuildOf } from '../../containers/BurgerBuilder/types';
import { RootState } from '../../store/reducers/types';
import './Burger.scss';
import BurgerIngredient from './BurgerIngredient/index';
import { Ingredients } from './BurgerIngredient/types';
import { Props } from './types';

const Burger: Props = () => {
  const ingredientsFromStore = useSelector((state: RootState) => state.burgerBuilder.ingredients);
  console.log('sraka');
  const transFormedIngredients = Object.keys(ingredientsFromStore)
    .map(ingKey => {
      return [...Array(ingredientsFromStore[ingKey as keyof IngredientsToBuildOf])].map(
        (_, index) => {
          return (
            <BurgerIngredient key={ingKey + index} type={ingKey as keyof IngredientsToBuildOf} />
          );
        }
      );
    })
    .reduce((acc, current) => {
      return [...acc, ...current];
    }, []);

  const isBurgerEmpty = !Object.keys(ingredientsFromStore).some(
    i =>
      ingredientsFromStore[i as keyof IngredientsToBuildOf] > 0 &&
      i !== Ingredients.SeedsOne &&
      i !== Ingredients.SeedsTwo
  );

  const emptyIngsSign = <p>Please start adding ingredients</p>;
  return (
    <div className="Burger">
      <BurgerIngredient type={Ingredients.BreadTop} />
      {isBurgerEmpty ? emptyIngsSign : transFormedIngredients}
      <BurgerIngredient type={Ingredients.BreadBottom} />
    </div>
  );
};

export default Burger;
