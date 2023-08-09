import logoPAth from '../../assets/images/logo.png';
import './Logo.scss';
import { Props } from './types';

const Logo: Props = ({ children }) => {
  return (
    <div className="Logo">
      <img src={logoPAth} alt="logo" className="Logo__img" />
    </div>
  );
};

export default Logo;
