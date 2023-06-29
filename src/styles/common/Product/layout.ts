import styled from 'styled-components';

export const ProductLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .title {
    font-weight: 600;
    font-size: 1.3rem;
  }

  .products {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;
