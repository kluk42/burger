import { Props } from './types';
import './Dropdown.scss';

const Dropdown: Props = ({ label, value, options, onChange, name }) => {
  return (
    <div className="Dropdown">
      <label className="Dropdown__label">{label}</label>
      <select value={value} className="Dropdown__field" onChange={onChange} name={name}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
