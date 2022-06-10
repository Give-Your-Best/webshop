import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CategoryMenuWrapper = styled.nav`
  margin: 0;
  width: 100%;
  background: ${({ theme }) => theme.colorMappings.yellow};
  height: 82px;
  padding: 0 calc((100vw - 80rem)/2);
`

export const CategoryMenuItem = styled.li`
  background: ${({ theme }) => theme.colorMappings.yellow};
  display: inline-block;
  height: 82px;

  :hover > ul {
    display: inherit;
  }
`;

export const CategoryMenuLink = styled(Link)`
  color:  ${({ theme }) => theme.colorMappings.primary};
  display: block;
  padding: 0 10px;
  display: table-cell;
  padding: 0 1rem;
  height: 82px;
  vertical-align: middle;
  font-family: lato;
  font-weight: bold;
  font-size: 20px;

  :hover {
    background-color: #F9D238;
  }
`;

export const SubMenuItem = styled(Link)`
  color: ${({ theme }) => theme.colorMappings.primary};
  background: #F9D238;
  padding: 5px 1em;
  display: block;
  font-family: lato;
  font-weight: bold;
  font-size: 18px;
`

export const MainMenuNav = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  position: relative;
  margin: 0 0 0 22px;
`

export const SubMenuNav = styled.ul`
  display: none;
  position: absolute;
  top: 82px;
  list-style: none;
  padding: 0;
  border: 1px solid #F9D238;
  z-index: 99;
`
