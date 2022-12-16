import { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useBAppDispatch } from '../helpers/hooks';
import Layout from '../hoc/Layout/index';
import { authCheckState } from '../infrastructure/store/slices/auth';
import { RootState } from '../infrastructure/store/slices/types';
import './App.scss';

const Checkout = lazy(() => import('../containers/Checkout'));
const Orders = lazy(() => import('../containers/Orders'));
const Auth = lazy(() => import('../containers/Auth'));
const Logout = lazy(() => import('../containers/Logout'));
const BurgerBuilder = lazy(() => import('../containers/BurgerBuilder'));

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
            <Route path={'contact-data'} />
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
  }, []);

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<Spinner />}>{routes()}</Suspense>
      </Layout>
    </div>
  );
}

export default App;
