import * as React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SwitcherBar = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;

const SectionTab = styled(Link)`
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme, $active }) =>
    $active ? theme.colorMappings.white : theme.colorMappings.primary};
  background: ${({ theme, $active }) =>
    $active ? theme.colorMappings.primary : theme.colorMappings.lightPink};
  transition:
    background 0.2s,
    color 0.2s;

  :hover {
    color: ${({ theme, $active }) =>
      $active ? theme.colorMappings.white : theme.colorMappings.primary};
    background: ${({ theme, $active }) =>
      $active ? theme.colorMappings.primary : '#f0b8b8'};
  }
`;

export const SectionSwitcher = () => {
  const { pathname } = useLocation();
  const isMenswear = pathname.startsWith('/menswear');
  const isChildren = pathname.startsWith('/children');
  const isWomen = pathname.startsWith('/womenswear');

  return (
    <SwitcherBar>
      <SectionTab to="/womenswear" $active={isWomen}>
        Women
      </SectionTab>
      <SectionTab to="/children" $active={isChildren}>
        Children
      </SectionTab>
      <SectionTab to="/menswear" $active={isMenswear}>
        Men
      </SectionTab>
    </SwitcherBar>
  );
};
