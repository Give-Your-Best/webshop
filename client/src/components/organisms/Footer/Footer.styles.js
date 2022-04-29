import styled from 'styled-components';

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 125px;
  background:  ${({ theme }) => theme.colorMappings.secondary};
  padding: 1em 4em;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 1em;
  }
`;
