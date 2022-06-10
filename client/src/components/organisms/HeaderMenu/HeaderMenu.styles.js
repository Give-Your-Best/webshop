import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderMenuWrapper = styled.div`
  display: table;
  margin-right: 15px;
`;

export const Icon = styled.img`
  width: 53px;
  height: 53px;
  display: block;
`;

export const UserMenuItem = styled(Link)`
  color: ${({ theme }) => theme.colorMappings.primary};
  font-size: 24px;
  margin-right: 1em;
  display: table-cell;
  vertical-align: middle;
  padding-left: 7px;
  font-family: lato, roboto;

  :hover {
    color: ${({ theme }) => theme.colorMappings.primary};
  }
`;
