import styled from 'styled-components';

export const CartLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .title {
    font-weight: 600;
    font-size: 1.3rem;
  }

  .product-name {
    font-weight: 600;
  }

  .cart-product {
    background-color: #F5F5F5;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .cart-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 0.5rem;

    user-select: none; 
    -webkit-user-select: none; 
    -moz-user-select: none; /
    -ms-user-select: none; 
  }

  .cart-wrapper span {
    background-color: #8f8f8f;
    padding: 0.2rem 0.7rem;
    border-radius: 0.3rem;
    color: white;
  }


`;
