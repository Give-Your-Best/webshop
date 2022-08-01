import styled from 'styled-components';
import { Card as AntCard } from 'antd';

export const Card = styled(AntCard)`
  width: 250px;
  height: 450px;
  margin: 1rem;
  padding: 7px;
  background: ${({ theme }) => theme.colorMappings.secondary};
  border-radius: 10px;
  border: none;

  img {
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colorMappings.lightPink};
    min-height: 230px;
    object-fit: cover;
    height: 280px;
    width: 100%;
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
    bottom: 15px;
    right: 10px;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      position:relative;
      margin: 7px 10px;
      right: 0;
      bottom: 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 0.75rem auto;
    width: 45%;
    height: 450px;
    img {
      min-height: 300px;
      height: 300px;
    }

    .ant-card-meta-title {
      font-size: 0.8rem;
    }
    .ant-card-meta-description {
      font-size: 0.6rem;
    }

    button {
      position: absolute;
    }
  }

  @media (max-width: 500px) {
    margin: 0.75rem auto;
    width: 45%;
    height: 390px;
    img {
      min-height: 200px;
      height: 200px;
    }

    .ant-card-meta-title {
      font-size: 0.8rem;
    }
    .ant-card-meta-description {
      font-size: 0.6rem;
    }

    button {
      position: absolute;
    }
  }
`;
