import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from '../containers/Auth';
import BurgerBuilder from '../containers/BurgerBuilder';
import Checkout from '../containers/Checkout';
import Logout from '../containers/Logout';
import Orders from '../containers/Orders';
import { useBAppDispatch } from '../helpers/hooks';
import Layout from '../hoc/Layout/index';
import { authCheckState } from '../store/slices/auth';
import { RootState } from '../store/slices/types';
import './App.scss';

function App() {
  const dispatch = useBAppDispatch();
  const isAuthenticated = useSelector<RootState, boolean>(state => state.auth.token !== '');

  const routes = () => {
    if (!isAuthenticated) {
      return (
        <Routes>
          <Route path="/">
            <BurgerBuilder />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Navigate to="/" replace />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/checkout/*">
            <Checkout />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/">
            <BurgerBuilder />
          </Route>
          <Navigate to="/" replace />
        </Routes>
      );
    }
  };

  useEffect(() => {
    authCheckState(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <Layout>{routes()}</Layout>
    </div>
  );
}

export default App;
