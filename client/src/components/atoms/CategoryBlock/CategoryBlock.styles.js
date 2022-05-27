import styled from 'styled-components';
import { Card as AntCard } from 'antd';

export const Card = styled(AntCard)`
  max-width: 80%;
  min-width: 70%;
  margin: 1rem auto;
  border: none;
  padding: 1rem;

  .ant-card-meta-title {
    font-size: 1rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0.3rem;
    max-width: 9rem;
    min-width: 9rem;

    .ant-card-meta-title {
      font-size: 0.8rem;
      text-align: center;
    }
  }
`;
