import { useDispatch, useSelector } from 'react-redux';

import { Props } from './types';
import { RootState } from '../../store/reducers/types';

import './NavigationItems.scss';

import NavigationItem from '../NavigationItem/index';
import { fetchOrdersStart } from '../../store/actions/order';

const NavigationItems: Props = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const handleOrdersLinkClick = () => {
    dispatch(fetchOrdersStart());
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
