import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderMenuWrapper = styled.div`
  display: table;
`;

export const UserMenuItem = styled(Link)`
  color: black;
  margin-right: 1em;
  display: table-cell;
  vertical-align: middle;
  padding-left: 1em;
  :hover {
    color: ${({ theme }) => theme.colorMappings.primary};
  }
`;
