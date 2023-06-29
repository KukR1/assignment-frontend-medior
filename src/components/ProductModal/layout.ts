import styled from 'styled-components';

export const FormLayout = styled.div`
  .form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 1rem;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    gap: 0.2rem;
    font-size: 0.8rem;
  }

  .input-wrapper label {
    display: flex;
    gap: 0.2rem;
    align-items: center;
  }

  .archive-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    gap: 0.5rem;
  }

  .lower-form-wrapper {
    display: flex;
    align-items: start;
    justify-content: start;
    gap: 2rem;
  }

  .input-wrapper p,
  .lower-form-wrapper p,
  .archive-wrapper p {
    padding: 0;
    margin: 0;
    font-weight: 600;
    font-size: 1rem;
  }

  .buttons-wrapper {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;
    padding-top: 1rem;
  }

  input {
    padding: 0.5rem;
  }

  textarea {
    padding: 0.5rem;
    width: 30rem;
    min-height: 5rem;
    max-height: 30rem;
    resize: vertical;
  }
`;
