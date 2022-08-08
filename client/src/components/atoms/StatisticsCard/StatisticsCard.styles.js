import styled from 'styled-components';
import { Statistic as AntStatistic } from 'antd';

export const Statistic = styled(AntStatistic)`
  width: 31%;
  margin: 6px;
  border: 1px solid ${({ theme }) => theme.colorMappings.borders};
  padding: 1em;
  text-align: center;

  .ant-statistic-title {
    font-size: 36px;
    font-weight: bold;
    color: ${({ theme }) => theme.colorMappings.primary};
  }

  .ant-statistic-content {
    font-size: 18px;
    color: ${({ theme }) => theme.colorMappings.primary};
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 0.5rem 0.3rem;
    width: 45%;

    .ant-card-meta-title {
      font-size: 17px;
    }
    .ant-card-meta-description {
      font-size: 16px;
    }
  }
`;
