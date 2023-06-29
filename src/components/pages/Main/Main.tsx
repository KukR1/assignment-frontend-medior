import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductList from './ProductList/ProductList';
import { ProductView } from './ProductView/ProductView';
import Cart from 'components/pages/Main/Cart/Cart';
import RecentlyViewed from './RecentlyViewed/RecentlyViewed';
import NavBar from 'components/NavBar/NavBar';

const App = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 90%;
  margin: 0 auto;

  .content {
    flex-grow: 1;
    display: grid;
    gap: 1rem;
    grid-template:
      'products product-view cart' 50%
      'products product-view recent' 50%/ 300px 1fr 300px;
  }

  .products {
    grid-area: products;
    overflow-y: auto;
  }

  .product-view {
    grid-area: product-view;
  }

  .product-view span {
    font-weight: 600;
    font-size: 1.3rem;
  }

  .cart {
    overflow-y: auto;

    grid-area: cart;
  }

  .recent-products {
    grid-area: recent;
  }
`;

export const Main = () => {
  const { id } = useParams();
  return (
    <App>
      <NavBar />
      <div className="content">
        <div className="products">
          <ProductList />
        </div>
        <div className="product-view">
          {id ? (
            <ProductView productId={id} />
          ) : (
            <span>{'<'} Select an item from the list, to view product..</span>
          )}
        </div>
        <div className="cart">
          <Cart />
        </div>
        <div className="recent-products">
          <RecentlyViewed />
        </div>
      </div>
    </App>
  );
};
