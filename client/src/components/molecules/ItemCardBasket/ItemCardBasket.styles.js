import styled from 'styled-components';
import { Card as AntCard } from 'antd';

export const CardLongWithBackground = styled(AntCard)`
  display: flex;
  margin-bottom: 2em;
  border: none !important;
  border-radius: 30px;
  padding: 1.5em;
  background: ${({ theme }) => theme.colorMappings.secondary} !important;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 1em;
  }
  
  .ant-card-body {
    padding: 7px 7px 7px 15px;
    width: 100%;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      padding: 0 0 0 5px;
    }

    button {
      margin-top: 5px !important;
    }

    p {
      margin-bottom: 0;
      font-size: 20px;
    }

    .ant-card-meta-title {
      margin-top: 5px;
      font-size: 20px;
      font-weight: bold;
      color: ${({ theme }) => theme.colorMappings.primary};
      margin-bottom: 0;
    }

    .ant-card-meta-description {
      font-size: 16px;
      color: ${({ theme }) => theme.colorMappings.primary};
      margin-bottom: 45px;
    }

    span {
      color: ${({ theme }) => theme.colorMappings.primary};
    }
  }
`;

export const CardLongImageWithBackground = styled.img`
  max-width: 200px;
  min-width: 200px;
  min-height: 120px;
  border-radius: 20px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    max-width: 100%;
    min-width: 100%;
  }
`;
