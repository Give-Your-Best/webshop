import styled from 'styled-components';
import { Card as AntCard } from 'antd';

export const Card = styled(AntCard)`
  width: 250px;
  height: 425px;
  margin: 1rem;
  padding: 7px;
  background: ${({ theme }) => theme.colorMappings.secondary};
  border-radius: 10px;
  border: none;

  img {
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colorMappings.lightPink};
  }

  .ant-card-body {
    padding: 7px;

    .ant-card-meta-title {
      color: ${({ theme }) => theme.colorMappings.primary};
      font-weight: bold;
      font-family: lato;
      margin-bottom: 0;
      font-size: 20px;
    }
  
    .ant-card-meta-description {
      color: ${({ theme }) => theme.colorMappings.primary};
      font-family: lato;
      font-size: 16px;
      margin-bottom: 1px;
    }
  }

  button {
    font-size: 16px;
    border: 2px solid ${({ theme }) => theme.colorMappings.primary};
    position: absolute;
    bottom: 0;
    right: 10px;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0.3rem;
    width: 150px;
    height: 300px;

    .ant-card-meta-title {
      font-size: 0.8rem;
    }
    .ant-card-meta-description {
      font-size: 0.6rem;
    }
  }
`;
