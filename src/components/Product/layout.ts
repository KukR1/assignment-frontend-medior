import styled from 'styled-components';

export const StyledProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 0.7rem;
  padding: 0.7rem 1rem;

  .name {
    cursor: pointer;
    font-weight: 600;
  }

  .tags {
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
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
