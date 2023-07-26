import { Table } from 'antd';
import styled from 'styled-components';

export const Heading = styled.h1`
  margin-bottom: 5px;
`;

export const SubHeader = styled.h2`
  text-align: left !important;
  margin: 1.25rem 0;
`;

export const SizesTable = styled(Table)`
  margin-bottom: 2.75rem;

  table {
    text-align: center;
  }

  thead > tr > th {
    border-bottom: 2px solid ${({ theme }) => theme.colorMappings.secondary};
    background-color: ${({ theme }) => theme.colorMappings.white};
    text-align: center;
    padding: 10px;
    font-weight: 700;
    font-size: 22px;
  }

  tr.ant-table-row:hover {
    background-color: ${({ theme }) => theme.colorMappings.lightPink};
  }

  && tbody > tr > td {
    padding: 10px;
  }

  .ant-table-cell {
    font-size: 20px;
    color: ${({ theme }) => theme.colorMappings.primary};

    @media (max-width: ${({ theme }) => theme.mid}) {
      font-size: 20px;
    }
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 18px;
    }
  }
`;
