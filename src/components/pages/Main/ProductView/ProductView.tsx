import { useGetFruitsQuery, useGetVegetablesQuery } from 'app/api';
import { getTagName } from 'helpers/tagNameId';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  addToCart,
  deleteFromCart,
  removeFromCart,
  selectCartItem,
} from 'app/cartSlice';
import { recentlyViewedProducts } from 'app/productSlice';
import { useEffect } from 'react';
import { RootState } from 'app/store';
import { getTagColor } from 'helpers/getTagColor';
import MinusButton from 'components/assets/MinusButton/MinusButton';
import AddButton from 'components/assets/AddButton/AddButton';
import DeleteButton from 'components/assets/DeleteButton/DeleteButton';
import CartButton from 'components/assets/CartButton/CartButton';
import GenericLoader from 'components/assets/Loaders/GenericLoader';
import { StyledProductView } from './layout';

interface ProductViewProps {
  productId?: string;
}

export const ProductView = ({ productId }: ProductViewProps) => {
  const { data: fruits } = useGetFruitsQuery();
  const { data: vegetables } = useGetVegetablesQuery();
  const dispatch = useAppDispatch();
  const products = [...(fruits || []), ...(vegetables || [])];
  const product = products.find((item) => item.id === productId);

  useEffect(() => {
    if (product) {
      dispatch(recentlyViewedProducts(product));
    }
  }, [product, dispatch]);

  const cartItem = useAppSelector((state: RootState) =>
    selectCartItem(state, productId || '')
  );

  const handleAddToCart = () => {
    if (product) dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    if (productId) dispatch(removeFromCart(productId));
  };

  const handleDeleteFromCart = () => {
    if (productId) dispatch(deleteFromCart(productId));
  };

  if (!product) {
    return <GenericLoader size={50} color="grey" />;
  }

  const { name, description, tags } = product;

  return (
    <StyledProductView>
      <div className="title">{name}</div>
      <div className="desc">{description}</div>
      <div className="tags">
        {tags &&
          tags.map((tagId, index) => (
            <p
              key={index}
              style={{ backgroundColor: getTagColor(getTagName(tagId)) }}
            >
              {getTagName(tagId)}
            </p>
          ))}
      </div>
      {cartItem ? (
        <div className="cart-wrapper">
          <MinusButton onClick={handleRemoveFromCart} />
          <span>{cartItem.count}</span>
          <AddButton onClick={handleAddToCart} />
          <DeleteButton onDelete={handleDeleteFromCart} />
        </div>
      ) : (
        <CartButton onClick={handleAddToCart} />
      )}
    </StyledProductView>
  );
};
