import './Dropdown.scss';
import { Props } from './types';

const Dropdown: Props = ({ label, value, options, onChange, name }) => {
  return (
    <div className="Dropdown">
      <label htmlFor={name} className="Dropdown__label">
        {label}
      </label>
      <select value={value} className="Dropdown__field" onChange={onChange}>
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
