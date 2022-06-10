import styled from 'styled-components';
import { Card as AntCard } from 'antd';

export const Card = styled(AntCard)`
  max-width: 80%;
  min-width: 80%;
  margin: 0.5rem auto;
  border: none;
  cursor: pointer;

  .ant-card-meta-title {
    font-size: 20px;
    text-align: center;
    color: ${({ theme }) => theme.colorMappings.blush};
  }

  .ant-card-body {
    padding: 10px;
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
