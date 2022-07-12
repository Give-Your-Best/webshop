import styled from 'styled-components';
import { Card as AntCard } from 'antd';

export const Card = styled(AntCard)`
  max-width: 80%;
  min-width: 80%;
  margin: 0.5rem auto;
  border: none;
  cursor: pointer;
  background: inherit;


  .ant-card-meta-title {
    font-size: 20px;
    margin: 0 auto;
    width: max-content;
    color: ${({ theme }) => theme.colorMappings.blush};
    background: ${({ theme }) => theme.colorMappings.background};
    font-weight: bold;
  }

  .ant-card-cover img {
    background: ${({ theme }) => theme.colorMappings.background};
    width: 200px;
    @media (max-width:${({ theme }) => theme.mid}) {
      width: 150px;
    }
    @media (max-width:${({ theme }) => theme.mobile}) {
      width: 230px;
      margin: auto;
    }
  }

  .ant-card-body {
    padding: 10px;
    background: ${({ theme }) => theme.colorMappings.background};
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 0.5rem 0.3rem;
    width: 240px;
    width: 240px;
    margin: auto;

    .ant-card-meta-title {
      font-size: 18px;
    }
  }
`;
