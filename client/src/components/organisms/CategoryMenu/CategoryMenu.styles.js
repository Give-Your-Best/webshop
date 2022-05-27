import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CategoryMenuWrapper = styled.div`
  margin: 0;
  width: 100%;
  padding: 0 4em;
  background: ${({ theme }) => theme.colorMappings.yellow};
  display: flex;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    height: 38px;
    padding: 38px 0 0 0;
  }
`;

export const SubCategoryMenuWrapper = styled.div`
  margin: 0;
  display: none;
`

export const CategoryMenuItem = styled.span`
  color: black;
  background: ${({ theme }) => theme.colorMappings.yellow};
  padding-right: 2em;
  transition: .3s all ease;

  :hover {
    color: ${({ theme }) => theme.colorMappings.primary};

    > div {
      display: block;
    }
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding-right: 0;
    text-align: center;
    display: ${({ open }) => open ? 'block' : 'none'};
    z-index: 10;
    position: relative;
  }
`;

export const SubMenuItem = styled(Link)`
  color: black;
  background: ${({ theme }) => theme.colorMappings.yellow};
  padding: right: 2em;
  display: block;

  :hover {
    color: ${({ theme }) => theme.colorMappings.primary};
  }
`
