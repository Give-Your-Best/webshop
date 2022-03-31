import styled from 'styled-components';
import { Select } from 'formik-antd';

const StyledSelect = styled(Select)`
    width: 100%;
  &:disabled {
    background-color: transparent;
    color: black;
    border: none;
  }
`

export { StyledSelect };