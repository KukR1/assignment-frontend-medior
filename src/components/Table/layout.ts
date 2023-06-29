import styled from 'styled-components';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    border: 1px solid #ddd;
    padding: 1.5rem;
    text-align: left;
    background-color: #f2f2f2;
  }

  tbody th {
    padding: 1rem;
    font-weight: normal;
  }

  thead th {
    color: black;
  }
`;
