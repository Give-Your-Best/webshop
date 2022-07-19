import styled from 'styled-components';
import { Card as AntCard } from 'antd';

export const CardLong = styled(AntCard)`
  display: flex;
  margin-bottom: 2em;
  border: none !important;
  background: inherit !important;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: block;
    border: 1px solid ${({ theme }) => theme.colorMappings.primary} !important;
    border-radius: 10px;
    padding: 10px;
  }

  .ant-card-body {
    padding: 7px 7px 7px 15px;
    width: 100%;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      padding: 0;
    }

    button {
      margin-top: 5px !important;
    }

    p {
      margin-bottom: 0;
      font-size: 20px;
    }

    .ant-card-meta-title {
      font-size: 20px;
      color: ${({ theme }) => theme.colorMappings.primary};
      margin-bottom: 0;
    }

    .ant-card-meta-description {
      font-size: 16px;
      color: ${({ theme }) => theme.colorMappings.primary};
    }

    span {
      color: ${({ theme }) => theme.colorMappings.primary};
    }
  }
`;

export const CardLongImage = styled.img`
  max-width: 200px;
  min-width: 200px;
  min-height: 120px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    max-width: 100%;
    min-width: 100%;
  }
`;