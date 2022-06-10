import styled from 'styled-components';

export const Container = styled.div`
  margin: 2rem auto;
  max-width: 80rem;
  padding: 0 2rem;

  > h1, h2, h3 {
    text-align: center;
  }

  p {
    color: ${({ theme }) => theme.colorMappings.primary};
    font-size: 20px;
  }
`;
