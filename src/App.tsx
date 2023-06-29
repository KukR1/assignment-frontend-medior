import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Main } from 'components/pages/Main';
import { Vegetables } from './components/pages/Vegetables';
import { Fruits } from './components/pages/Fruits';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ProductView } from 'components/pages/Main/ProductView/ProductView';
import ProductList from 'components/pages/Main/ProductList/ProductList';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductView />} />
          </Route>
          <Route path="/admin/vegetables" element={<Vegetables />} />
          <Route path="/admin/fruits" element={<Fruits />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
