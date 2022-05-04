import { useSelector } from 'react-redux';
import { useBAppDispatch } from '../../helpers/hooks';
import { initFetchingOrders } from '../../infrastructure/store/slices/order';
import { RootState } from '../../infrastructure/store/slices/types';
import NavigationItem from '../NavigationItem/index';
import './NavigationItems.scss';
import { Props } from './types';

const NavigationItems: Props = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useBAppDispatch();
  const handleOrdersLinkClick = () => {
    dispatch(initFetchingOrders());
  };
  return (
    <ul className="NavigationItems">
      <NavigationItem exact link="/">
        Burger Builder
      </NavigationItem>
      {token ? (
        <NavigationItem handleLinkClick={handleOrdersLinkClick} exact link="/orders">
          Orders
        </NavigationItem>
      ) : null}
      {token ? (
        <NavigationItem exact link="/logout">
          Logout
        </NavigationItem>
      ) : (
        <NavigationItem exact link="/auth">
          Auth
        </NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
