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
  && tbody > tr > td {
    padding: 10px 4px;
  }
`


export { ListWrapper, ExpandButton, StyledTable, DeleteButton };
