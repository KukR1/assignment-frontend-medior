import styled from 'styled-components';

export const StyledAdminLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1rem;
  width: 90%;
  margin: 0 auto;

  .main-wrapper {
    display: flex;
    width: 100%;
    margin: 0 auto;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  .buttons-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  .buttons {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .delete-btn-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
