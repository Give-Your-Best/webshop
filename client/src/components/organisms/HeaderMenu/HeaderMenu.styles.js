import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderMenuWrapper = styled.div`
  float: right;
  height: 3.25rem;
  line-height: 3.25rem;
`;

export const UserMenuItem = styled(Link)`
  vertical-align: middle;
  color: black;
  padding: .25em;
  margin: 1em;
`;
