import styled from 'styled-components';

export const Link = styled.a`
  color: ${({ theme }) => theme.colorMappings.primary};

  :hover {
    text-decoration: underline;
  }
`;
