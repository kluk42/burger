import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { logOut } from '../../store/actions';

import { Props } from './types';

import './Logout.scss';

const Logout: Props = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut());
  }, [dispatch]);

  return <Redirect to="/" />;
};

export default Logout;
