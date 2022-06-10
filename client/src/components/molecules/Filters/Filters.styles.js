import styled from 'styled-components';
import { Collapse } from 'antd';

export const FiltersWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colorMappings.primary};
  width: 100%;
  padding: 1em;
  display: flex;
`;

export const ClearFilters = styled.p`
  display: inline-block;
  color: ${({ theme }) => theme.colorMappings.primary};
  min-width: 150px;
  font-size: 18px;
  cursor: pointer;
  margin: 0 20px;
`

export const FilterItem = styled.p`
  display: inline-block;
  color: ${({ theme }) => theme.colorMappings.primary};
  min-width: 150px;
  font-size: 18px;
  margin: 0 10px;
`

export const Accordian = styled(Collapse)`
    background: none;
    border: none;
    width: fit-content;
    min-width: 200px;
    color: ${({ theme }) => theme.colorMappings.primary};

    .ant-collapse-item {
        border: none;
    }

    .ant-collapse-content {
      border-top: 1px solid ${({ theme }) => theme.colorMappings.primary};
    }

    .ant-collapse-header {
        padding: 0 !important;
        font-size: 18px !important;
        color: ${({ theme }) => theme.colorMappings.primary} !important;
        margin-right: 20px;
    }
`
