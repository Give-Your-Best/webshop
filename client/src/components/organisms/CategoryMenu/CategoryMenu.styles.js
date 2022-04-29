import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CategoryMenuWrapper = styled.div`
  margin: 0;
  width: 100%;
  padding: 0 4em;
  background: ${({ theme }) => theme.colorMappings.yellow};
  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 38px;
    padding: 38px 0 0 0;
  }
`;

export const CategoryMenuItem = styled(Link)`
  color: black;
  background: ${({ theme }) => theme.colorMappings.yellow};
  line-height: 4em;
  padding-right: 2em;

  :hover {
    color: ${({ theme }) => theme.colorMappings.primary};
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding-right: 0;
    text-align: center;
    line-height: 2em;
    display: ${({ open }) => open ? 'block' : 'none'};
    z-index: 10;
    position: relative;
  }
`;
