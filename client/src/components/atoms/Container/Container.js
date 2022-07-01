import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 80rem;
  padding: 2rem 2rem;
  background: ${({ theme }) => theme.colorMappings.background};

  > h1, h2, h3 {
    text-align: center;
  }

  p {
    color: ${({ theme }) => theme.colorMappings.primary};
    font-size: 20px;
  }

  @media (max-width:${({ theme }) => theme.mid}) {
    padding: 1rem 1rem;
  }
`;
