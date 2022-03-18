import styled from 'styled-components';
import { Statistic as AntStatistic } from 'antd';

export const Statistic = styled(AntStatistic)`
  flex: 1;
  max-width: 13rem;
  min-width: 13rem;
  margin: 1rem;
  border: 1px solid #e0e0e0;
  padding: 1em;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0.5rem 0.3rem;
    max-width: 9rem;
    min-width: 9rem;

    .ant-card-meta-title {
      font-size: 0.8rem;
    }
    .ant-card-meta-description {
      font-size: 0.6rem;
    }
  }
`;
