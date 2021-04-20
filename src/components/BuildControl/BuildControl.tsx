import {Props} from './types';
import './BuildControl.scss';

const BuildControl: Props = ({label, added, removed, removeDisabled}) => {
    return (
        <div className="BuildControl">
            <div className="BuildControl__label">
                {label}
            </div>
            <button
                onClick={removed}
                className="BuildControl__button BuildControl__button_type_less"
                disabled={removeDisabled}
            >
                Less
            </button>
            <button
                onClick={added}
                className="BuildControl__button BuildControl__button_type_more"
            >
                More
            </button>
        </div>
    )
}

export default BuildControl;
