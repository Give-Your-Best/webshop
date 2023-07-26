import styled from 'styled-components';
import { Progress } from 'antd';

export const StyledProgress = styled(Progress)`
  width: 100%;

  .ant-progress-inner {
    background-color: white;
    border-radius: 100px;
    border: 1px solid ${({ theme }) => theme.colorMappings.primary};
  }
`;
