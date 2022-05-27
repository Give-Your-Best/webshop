import styled from 'styled-components';
import { Card as AntCard } from 'antd';

export const CardLong = styled(AntCard)`
  margin: 1rem;
  display: flex;

  .ant-card-body {
    padding: 10px;
    width: 100%;

    p {
      margin-bottom: 0;
    }
  }
`;

export const CardLongImage = styled.img`
  max-width: 200px;
`;
