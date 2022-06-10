import styled from 'styled-components';
import { Breadcrumb } from 'antd';

export const StyledBreadcrumbs = styled(Breadcrumb)`
  margin: 1em 0 1em 3em;
  font-size: 20px;
  color: ${({ theme }) => theme.colorMappings.primary};

  .ant-breadcrumb-separator {
    color: ${({ theme }) => theme.colorMappings.primary};
  }

  span {
    cursor: pointer;
  }

  li:last-child {
    color: ${({ theme }) => theme.colorMappings.primary};
  }
`;
