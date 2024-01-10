import { Alert } from 'antd';
import styled from 'styled-components';

export const StyledAlert = styled(Alert)`
  border: none;

  .ant-alert-message,
  .ant-alert-description {
    font-size: 20px;
    font-weight: bold;
  }

  > * {
    margin: 0.5rem;
  }
`;
