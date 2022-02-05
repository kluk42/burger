import { Props } from './types';
import './Logo.scss';
import logoPAth from '../../assets/images/logo.png';

const Logo: Props = ({ children }) => {
  return (
    <div className="Logo">
      <img src={logoPAth} alt="logo" className="Logo__img" />
    </div>
  );
};

export default Logo;
