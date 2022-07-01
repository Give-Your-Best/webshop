import styled from 'styled-components';
import { Breadcrumb } from 'antd';

export const StyledBreadcrumbs = styled(Breadcrumb)`
  margin: 0 0 0 3em;
  font-size: 24px;
  text-transform: lowercase;
  color: ${({ theme }) => theme.colorMappings.primary};

  .ant-breadcrumb-separator {
    color: ${({ theme }) => theme.colorMappings.primary};
    margin: 0 5px;
  }

  span {
    cursor: pointer;
  }

  li {
    margin-right: 7px;
  }

  li:last-child {
    color: ${({ theme }) => theme.colorMappings.primary};
  }
`;
