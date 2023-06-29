import styled from 'styled-components';

export const StyledProductView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: auto;
  padding: 0 5rem;

  .title {
    font-weight: 600;
    font-size: 1.3rem;
    text-decoration: underline;
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
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    color: white;
  }

  .tags {
    display: flex;
    gap: 0.4rem;
  }

  .desc{
    width: 70%;
  }

  .tags p {
    margin: 0;
    display: inline-block;
    padding: 0.2rem 0.3rem;
    border: 1px solid #ddd;
    border-radius: 0.2rem;
    font-size: 0.8rem;
    color: #666;
    background-color: #f5f5f5;
  }
`;
