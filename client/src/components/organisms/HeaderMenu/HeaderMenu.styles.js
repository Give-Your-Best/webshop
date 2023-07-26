import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderMenuWrapper = styled.div`
  display: table;
  margin-right: 15px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;

export const Icon = styled.img`
  width: 50px;
  height: 50px;
  display: block;
`;

export const UserMenuItem = styled(Link)`
  color: ${({ theme }) => theme.colorMappings.primary};
  font-size: 20px;
  margin-right: 1em;
  display: table-cell;
  vertical-align: middle;
  padding-left: 7px;
  font-family: lato, roboto;

  :hover {
    color: ${({ theme }) => theme.colorMappings.primary};
  }
`;
