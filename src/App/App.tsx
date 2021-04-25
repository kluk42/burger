import { Route, Switch } from 'react-router-dom';

import './App.scss';
import Layout from '../hoc/Layout/index';
import BurgerBuilder from '../containers/BurgerBuilder';
import Checkout from '../containers/Checkout';
import Orders from '../containers/Orders';

function App() {
  return (
    <div className="App">
        <Layout>
            <Switch>
                <Route exact path="/">
                    <BurgerBuilder/>
                </Route>
                <Route path="/checkout">
                    <Checkout/>
                </Route>
                <Route path="/orders">
                    <Orders/>
                </Route>
            </Switch>
        </Layout>
    </div>
  );
}

export default App;
