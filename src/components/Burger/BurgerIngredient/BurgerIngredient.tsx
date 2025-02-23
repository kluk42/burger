import { Ingredients } from '../../../hooks/useIngredients/types';
import './BurgerIngredient.scss';
import { Props } from './types';

const BurgerIngredient: Props = ({ type }) => {
  let ingredient: JSX.Element | null;
  switch (type) {
    case 'BreadBottom':
      ingredient = <div className={type}></div>;
      break;
    case 'BreadTop':
      ingredient = (
        <div className={'BreadTop'}>
          <div className={Ingredients.SeedsOne}></div>
          <div className={Ingredients.SeedsTwo}></div>
        </div>
      );
      break;
    case Ingredients.Meat:
      ingredient = <div className={Ingredients.Meat}></div>;
      break;
    case Ingredients.Cheese:
      ingredient = <div className={Ingredients.Cheese}></div>;
      break;
    case Ingredients.Salad:
      ingredient = <div className={Ingredients.Salad}></div>;
      break;
    case Ingredients.Bacon:
      ingredient = <div className={Ingredients.Bacon}></div>;
      break;
    default:
      ingredient = null;
  }
  return <>{ingredient}</>;
};

export default BurgerIngredient;
