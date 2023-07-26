import styled from 'styled-components';
import { Box } from '../../components';
import { Link } from 'react-router-dom';

export const DonorLink = styled(Link)`
  color: ${({ theme }) => theme.colorMappings.primary};
  padding: 0;
  margin: 1.5em 0;
  font-family: lato;
  font-weight: bold;
  font-size: 18px;
  text-decoration: underline;
  display: block;
`;

export const ItemWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin: 3em 0 4em 0;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: block;
  }
`;

export const ImagesWrapper = styled.div`
  display: flex;
  width: 50%;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100% !important;
  }

  > img {
    width: 80%;
    height: fit-content;
    margin-left: 10px;
    border-radius: 1em !important;
    border: 1px solid ${({ theme }) => theme.colorMappings.borders};
  }
`;

export const MiniImagesWrapper = styled(Box)`
  display: inline;
  max-width: 20%;
  min-width: 20%;

  > img {
    width: 100%;
    max-height: 200px;
    border: 1px solid ${({ theme }) => theme.colorMappings.borders};
    border-radius: 10px;
    margin: 5px 0;
    cursor: pointer;
  }
`;

export const ItemDetailsWrapper = styled.div`
  width: 50%;
  margin-left: 3rem;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
    margin-left: 0;
  }

  h1 {
    text-align: left;
    font-family: lato;
    font-size: 48px;
    font-weight: bold;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 26px;
    }
  }

  p {
    font-family: lato;
    font-size: 24px;
    color: ${({ theme }) => theme.colorMappings.primary};
    margin-bottom: 5px;

    a {
      font-family: lato;
      font-size: 17px;
      margin-left: 20px;
      text-decoration: underline;
    }

    @media (max-width: ${({ theme }) => theme.mobile}) {
      margin-bottom: 10px;
      font-size: 20px;
    }
  }
`;
