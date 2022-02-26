import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useBAppDispatch } from '../../helpers/hooks';
import { logOut } from '../../store/slices/auth';
import './Logout.scss';
import { Props } from './types';

const Logout: Props = () => {
  const dispatch = useBAppDispatch();

  useEffect(() => {
    dispatch(logOut());
  }, [dispatch]);

  return <Redirect to="/" />;
};

export default Logout;
