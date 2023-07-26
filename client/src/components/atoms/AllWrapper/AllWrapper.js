import styled from 'styled-components';

export const AllWrapper = styled.div`
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colorMappings.background};
`;
