import {Props} from './types';
import './BuildControl.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers/types';
import { addIngredient, removeIngredient } from '../../store/actions';

const BuildControl: Props = ({label}) => {
    const ingredients = useSelector((state: RootState) => state.burgerBuilder.ingredients);
    const dispatch = useDispatch();

    const handleAdd = () => {
        dispatch(addIngredient(label));
    }

    const handleRemove = () => {
        dispatch(removeIngredient(label));
    }
    return (
        <div className="BuildControl">
            <div className="BuildControl__label">
                {label}
            </div>
            <button
                onClick={handleRemove}
                className="BuildControl__button BuildControl__button_type_less"
                disabled={ingredients[label] === 0}
            >
                Less
            </button>
            <button
                onClick={handleAdd}
                className="BuildControl__button BuildControl__button_type_more"
            >
                More
            </button>
        </div>
    )
}

export default BuildControl;
