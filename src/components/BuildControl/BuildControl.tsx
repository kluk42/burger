import { useSelector } from 'react-redux';
import { useBAppDispatch } from '../../helpers/hooks';
import { addIngredient, removeIngredient } from '../../store/slices/burgerBuilder';
import { RootState } from '../../store/slices/types';
import './BuildControl.scss';
import { Props } from './types';

const BuildControl: Props = ({ label }) => {
  const ingredients = useSelector((state: RootState) => state.burgerBuilder.ingredients);
  const dispatch = useBAppDispatch();

  const handleAdd = () => {
    dispatch(addIngredient({ ingredientName: label }));
  };

  const handleRemove = () => {
    dispatch(removeIngredient({ ingredientName: label }));
  };
  return (
    <div className="BuildControl">
      <div className="BuildControl__label">{label}</div>
      <button
        onClick={handleRemove}
        className="BuildControl__button BuildControl__button_type_less"
        disabled={ingredients[label] === 0}
      >
        Less
      </button>
      <button onClick={handleAdd} className="BuildControl__button BuildControl__button_type_more">
        More
      </button>
    </div>
  );
};

export default BuildControl;
