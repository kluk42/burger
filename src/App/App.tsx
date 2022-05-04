import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from '../containers/Auth';
import BurgerBuilder from '../containers/BurgerBuilder';
import Checkout from '../containers/Checkout';
import Logout from '../containers/Logout';
import Orders from '../containers/Orders';
import { useBAppDispatch } from '../helpers/hooks';
import Layout from '../hoc/Layout/index';
import { authCheckState } from '../infrastructure/store/slices/auth';
import { RootState } from '../infrastructure/store/slices/types';
import './App.scss';

function App() {
  const dispatch = useBAppDispatch();
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
    authCheckState(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <Layout>{routes()}</Layout>
    </div>
  );
}

export default App;
