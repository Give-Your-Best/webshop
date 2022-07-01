import styled from 'styled-components';
import { Collapse } from 'antd';
import { SubmitButton } from 'formik-antd';
import { Form } from 'formik';

export const FiltersWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colorMappings.primary};
  width: 100%;
  padding: 1em;
  display: flex;
`;

export const ClearFilters = styled.p`
  display: inline-block;
  color: ${({ theme }) => theme.colorMappings.primary};
  min-width: 150px;
  font-size: 18px;
  cursor: pointer;
  margin: 0 20px;
`

export const FilterItem = styled.p`
  display: inline-block;
  color: ${({ theme }) => theme.colorMappings.primary};
  min-width: 150px;
  font-size: 18px;
  margin: 0 10px;
`

export const StyledForm = styled(Form)`
  width: 100%;
  .ant-collapse {
    display: flex;
    width: 100%;
  }

  button {
    max-width: 170px;
    max-height: 46px;
  }
`

export const Accordian = styled(Collapse)`
    background: none;
    border: none;
    width: fit-content;
    min-width: 200px;
    color: ${({ theme }) => theme.colorMappings.primary};

    .ant-collapse-item {
        border: none;
    }

    .ant-collapse-content {
      border: 2px solid ${({ theme }) => theme.colorMappings.primary};
      background: ${({ theme }) => theme.colorMappings.background};
      margin-top: -2px;
      width: 173px;
      position: absolute;
      z-index: 999;

      .ant-checkbox-group {
        display: inline-grid;
      }
    }

    .ant-collapse-header {
        padding: 0 !important;
        font-size: 22px !important;
        color: ${({ theme }) => theme.colorMappings.primary} !important;
        margin-right: 2em;
        border: 2px solid ${({ theme }) => theme.colorMappings.primary};
        padding: 3px 15px 4px 10px !important;
    }
`

export const StyledSubmitButton = styled(SubmitButton)`
  width: 150px;
  float: right;
  cursor: pointer;
  background: ${({ theme }) => theme.colorMappings.yellow};
  font-weight: bold;
  font-size: 22px;
  cursor: pointer;
  border-radius: 0.1rem;
  border: 2px solid ${({ theme }) => theme.colorMappings.buttonBorder} !important;
  color: ${({ theme }) => theme.colorMappings.primary};
  padding: 3px 15px 4px 10px !important;

    span {
      text-align: center;
      width: 100%;
    }

  :hover {
    background: ${({ theme }) => theme.colorMappings.yellow};
    border-radius: 0.1rem;
    border: 2px solid ${({ theme }) => theme.colorMappings.buttonBorder};
    color: ${({ theme }) => theme.colorMappings.primary};
  }
  :focus {
    background: ${({ theme }) => theme.colorMappings.yellow};
    border-radius: 0.1rem;
    border: 2px solid ${({ theme }) => theme.colorMappings.buttonBorder};
    color: ${({ theme }) => theme.colorMappings.primary};
  }
`
