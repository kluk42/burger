import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import ContactData from '../components/ContactData';
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
          <Route path="/" element={<BurgerBuilder />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/checkout/" element={<Checkout />}>
            <Route path={'contact-data'} element={<ContactData />} />
          </Route>
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<BurgerBuilder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
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
