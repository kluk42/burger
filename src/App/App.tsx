import './App.scss';
import Layout from '../hoc/Layout/index';
import BurgerBuilder from '../containers/BurgerBuilder/index';

function App() {
  return (
    <div className="App">
        <Layout>
            <BurgerBuilder/>
        </Layout>
    </div>
  );
}

export default App;
