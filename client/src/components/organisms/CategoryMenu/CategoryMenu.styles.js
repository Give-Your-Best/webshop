import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CategoryMenuWrapper = styled.nav`
  margin: 0;
  width: 100%;
  background: ${({ theme }) => theme.colorMappings.yellow};
  height: 82px;
  padding: 0 calc((100vw - 80rem) / 2);
  box-shadow: 0px 3px 10px #ef7c9829;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;

export const CategoryMenuItem = styled.li`
  background: ${({ theme }) => theme.colorMappings.yellow};
  display: inline-block;
  height: 82px;

  :hover > ul {
    display: inherit;
  }
`;

export const CategoryMenuLink = styled(Link)`
  color: ${({ theme }) => theme.colorMappings.primary};
  display: block;
  padding: 0 10px;
  display: table-cell;
  padding: 0 1.5rem;
  height: 82px;
  vertical-align: middle;
  font-weight: bold;
  font-size: 20px;

  :hover {
    color: ${({ theme }) => theme.colorMappings.primary};
  }

  @media (max-width: ${({ theme }) => theme.mid}) {
    padding: 0 0.75rem;
    font-size: 18px;
  }
`;

export const SubMenuItem = styled(Link)`
  color: ${({ theme }) => theme.colorMappings.buttonBorder}; !important;
  padding: 5px 1em;
  display: block;
  font-size: 20px;
  :hover {
    text-decoration: underline;
    font-weight: bold;
  }
  @media (max-width:${({ theme }) => theme.mid}) {
    padding: 0 0.75rem;
    font-size: 18px;
  }
`;

export const MainMenuNav = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  position: relative;
  margin: 0 0 0 22px;
  @media (max-width: ${({ theme }) => theme.mid}) {
    margin: 0 0 0 0;
  }
`;

export const SubMenuNav = styled.ul`
  background: ${({ theme }) => theme.colorMappings.yellow};
  display: none;
  position: absolute;
  top: 82px;
  list-style: none;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colorMappings.yellow};
  z-index: 99;
  width: 300px;
`;
