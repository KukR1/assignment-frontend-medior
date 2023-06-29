import { addToCart, deleteFromCart, removeFromCart } from 'app/cartSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import AddButton from 'components/assets/AddButton/AddButton';
import DeleteButton from 'components/assets/DeleteButton/DeleteButton';
import MinusButton from 'components/assets/MinusButton/MinusButton';
import React from 'react';
import styled from 'styled-components';
import { Fruit } from 'types/Fruit';
import { Vegetable } from 'types/Vegetable';
import { CartLayout } from './layout';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const handleIncrease = (product: Fruit | Vegetable) => {
    dispatch(addToCart(product));
  };

  const handleDecrease = (product: Fruit | Vegetable) => {
    dispatch(removeFromCart(product.id));
  };

  const handleRemove = (product: Fruit | Vegetable) => {
    dispatch(deleteFromCart(product.id));
  };

  return (
    <CartLayout>
      <div className="title">Your Cart</div>
      {cartItems.length === 0 && <div>Cart is empty.</div>}
      {Object.values(cartItems).map((item) => (
        <div className="cart-product" key={item.product.id}>
          <div className="product-name">{item.product.name}</div>
          <div className="cart-wrapper">
            <MinusButton onClick={() => handleDecrease(item.product)} />
            <span>{item.count}</span>
            <AddButton onClick={() => handleIncrease(item.product)} />
            <DeleteButton onDelete={() => handleRemove(item.product)} />
          </div>
        </div>
      ))}
    </CartLayout>
  );
};

export default Cart;
