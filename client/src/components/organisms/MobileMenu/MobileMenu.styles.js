import styled from 'styled-components';

export const CategoryMenuWrapper = styled.nav`
  margin: 0;
  background: ${({ theme }) => theme.colorMappings.secondary};
  width: 270px;
  height: 100%;
  padding: 30px 0;
  box-shadow: 0px 3px 10px #EF7C9829;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 500;
  display: none;
`

export const CategoryMenuItem = styled.li`
  background: ${({ theme }) => theme.colorMappings.secondary};
  width: 100%;
  line-height: 3;

  &.open > ul {
    display: inline-block;
  }
`;

export const CategoryMenuLink = styled.div`
  color:  ${({ theme }) => theme.colorMappings.primary};
  display: flex;
  padding: 0 10px;
  padding: 0 1.5rem;
  vertical-align: middle;
  font-weight: bold;
  font-size: 20px;
  padding: 2.5px 20px;
  position: relative;
  cursor: pointer;

  :hover {
    color:  ${({ theme }) => theme.colorMappings.primary};
  }

  img {
    margin-right: 10px;
  }

  @media (max-width:${({ theme }) => theme.mid}) {
    font-size: 18px;
  }
`;

export const SubMenuItem = styled.div`
  color: ${({ theme }) => theme.colorMappings.buttonBorder}; !important;
  padding: 0 20px;
  display: inline-block;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  :hover {
    text-decoration: underline;
    font-weight: bold;
  }
  @media (max-width:${({ theme }) => theme.mid}) {
    font-size: 18px;
  }
`

export const MainMenuNav = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  position: relative;
  margin: 0 0 0 22px;
  @media (max-width:${({ theme }) => theme.mid}) {
    margin: 0 0 0 0;
  }
`

export const SubMenuNav = styled.ul`
  background: ${({ theme }) => theme.colorMappings.yellow};
  display: none;
  list-style: none;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colorMappings.yellow};
  z-index: 99;
  width: 100%
`


export const Down = styled.span`
  position: absolute;
  right: 20px;
  top: 22px;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid ${({ theme }) => theme.colorMappings.primary};;
  width: 20px;
  cursor: pointer;
`

export const Cross = styled.span`
  width: 30px;
  height: 30px;
  position: relative;
  transform:rotate(45deg);
  position: absolute;
  left: 235px;
  top: 10px;
  z-index:9999;
  cursor: pointer;
  display: none;

  :before, :after {
    content: "";
    position: absolute;
    z-index: -1;
    background: ${({ theme }) => theme.colorMappings.primary};
   }

   :before {
    left: 50%;
    width: 20%;
    margin-left: -15%;
    height: 90%;
   }

   :after {
    top: 50%;
    height: 20%;
    margin-top: -15%;
    width: 90%;
   }
`

