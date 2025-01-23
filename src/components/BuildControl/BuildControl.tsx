import './BuildControl.scss';
import { Props } from './types';

const BuildControl: Props = ({ label, amount, add, subtract }) => {
  return (
    <div className="BuildControl">
      <div className="BuildControl__label">{label}</div>
      <button
        onClick={subtract}
        className="BuildControl__button BuildControl__button_type_less"
        disabled={amount === 0}
      >
        Less
      </button>
      <button onClick={add} className="BuildControl__button BuildControl__button_type_more">
        More
      </button>
    </div>
  );
};

export default BuildControl;
