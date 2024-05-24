import styled from 'styled-components';
import { Select } from 'formik-antd';

const StyledSelect = styled(Select)`
    width: 100%;
    font-size: 20px;
    min-width: 400px;
    color: ${({ theme }) => theme.colorMappings.primary};

    @media (max-width: ${({ theme }) => theme.mobile}) {
      min-width: 100%;
    }

    .ant-select-selector {
      color: ${({ theme }) => theme.colorMappings.primary};
      border: 1px solid ${({ theme }) =>
        theme.colorMappings.primary} !important;
      height: 42px;
    }

    .ant-select-arrow {
      color: ${({ theme }) => theme.colorMappings.primary};
    }

    .ant-select-item {
      color: ${({ theme }) => theme.colorMappings.primary};
    }
    &.batchSizeSelector { 
      min-width: unset;
    }
  &:disabled {
    background-color: transparent;
    color: black;
    border: none;spotif
  }

  ${({ reportStyle }) =>
    reportStyle &&
    `
    // Override styles for report here...
    min-width: 100px;
    max-width: 200px;
  `}
`;

export { StyledSelect };
