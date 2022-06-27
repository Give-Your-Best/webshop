import styled from 'styled-components';
import { Select } from 'formik-antd';

const StyledSelect = styled(Select)`
    width: 100%;
    font-size: 20px;
    min-width: 400px;
    color: ${({ theme }) => theme.colorMappings.primary};

    .ant-select-selector {
      color: ${({ theme }) => theme.colorMappings.primary};
      border: 1px solid ${({ theme }) => theme.colorMappings.primary} !important;
    }

    .ant-select-arrow {
      color: ${({ theme }) => theme.colorMappings.primary};
    }

    .ant-select-item {
      color: ${({ theme }) => theme.colorMappings.primary};
    }
  &:disabled {
    background-color: transparent;
    color: black;
    border: none;spotif
  }
`

export { StyledSelect };