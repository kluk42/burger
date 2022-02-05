import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import { authCheckState } from '../store/actions';

import { RootState } from '../store/reducers/types';

import Auth from '../containers/Auth';
import Layout from '../hoc/Layout/index';
import BurgerBuilder from '../containers/BurgerBuilder';
import Checkout from '../containers/Checkout';
import Logout from '../containers/Logout';
import Orders from '../containers/Orders';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector<RootState, boolean>(state => state.auth.token !== '');

  const routes = () => {
    if (!isAuthenticated) {
      return (
        <Switch>
          <Route exact path="/">
            <BurgerBuilder />
          </Route>
          <Route exact path="/auth">
            <Auth />
          </Route>
          <Redirect to="/" />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route exact path="/auth">
            <Auth />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route exact path="/">
            <BurgerBuilder />
          </Route>
          <Redirect to="/" />
        </Switch>
      );
    }
  };

  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  return (
    <div className="App">
      <Layout>{routes()}</Layout>
    </div>
  );
}

export default App;
