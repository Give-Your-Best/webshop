import styled from 'styled-components';
import { Table } from 'antd'

const ListWrapper = styled.div`
  width: 100%;
`
const ExpandButton = styled.span`
  border-left: 1px solid ${({ theme }) => theme.colorMappings.borders};
  padding-left: 10px;
  cursor: pointer;
`

const DeleteButton = styled.span`
  cursor: pointer;
`

const StyledTable = styled((props) => <Table {...props} />)`
  margin-bottom: 2em;

  .ant-table-empty {
    background: inherit;
  }
  
    && tbody > tr > td {
      padding: 10px 4px;
    }

    .ant-table-cell {
      font-size: 22px;
      color: ${({ theme }) => theme.colorMappings.primary};
      font-family: lato;
      @media (max-width:${({ theme }) => theme.mid}) {
        font-size: 20px;
      }
    }

    .ant-table-row,
    .ant-table-tbody > tr.ant-table-row:hover > td, 
    .ant-table-tbody > tr > td.ant-table-cell-row-hover,
    .ant-table-row:hover,
    tr.ant-table-expanded-row:hover > td, tr.ant-table-expanded-row > td {
      background: ${({ theme }) => theme.colorMappings.background}; !important;
    }

    .ant-table-tbody > tr > td {
      border-bottom: 1px solid ${({ theme }) => theme.colorMappings.borders};
      transition: background .3s;
    }
`
export { ListWrapper, ExpandButton, StyledTable, DeleteButton };
