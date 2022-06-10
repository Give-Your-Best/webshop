import styled from 'styled-components';

export const AccountIconImage = styled.img`
  width: 200px;
  margin: auto;
  cursor: pointer;
  margin: 1em 2em;
`;

export const AccountIconCaption = styled.p`
  font-size: 24px;
  font-family: Lato;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colorMappings.blush};
`;
