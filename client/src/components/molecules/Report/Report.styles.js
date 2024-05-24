import styled from 'styled-components';
import { SubmitButton, DatePicker } from 'formik-antd';
import { Form } from 'formik';

export const ReportWrapper = styled.div`
  margin-top: 2em;

  .ant-picker {
    color: ${({ theme }) => theme.colorMappings.primary};
    border: 1px solid ${({ theme }) => theme.colorMappings.primary};
    height: 50px;

    .ant-picker-input > input::placeholder {
      color: ${({ theme }) => theme.colorMappings.primary};
      font-size: 18px;
      font-family: lato;
    }

    .anticon {
      color: ${({ theme }) => theme.colorMappings.primary};
    }
  }
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
  gap: 20px;
`;

export const StyledDatePicker = styled(DatePicker)`
  color: ${({ theme }) => theme.colorMappings.primary};
  border: 1px solid ${({ theme }) => theme.colorMappings.primary};
  margin: 0;
  padding: 0;
  display: block;
  max-height: 50px !important;
  background-color: transparent;
  color: ${({ theme }) => theme.colorMappings.primary};
  background: transparent;
  font-size: 20px;
`;

export const StyledSubmitButton = styled(SubmitButton)`
  width: 200px;
  max-width: 200px !important;
  height: 50px;
  cursor: pointer;
  background: ${({ theme }) => theme.colorMappings.yellow};
  font-weight: bold;
  font-size: 22px;
  cursor: pointer;
  border-radius: 0.1rem;
  border: 2px solid ${({ theme }) => theme.colorMappings.buttonBorder} !important;
  color: ${({ theme }) => theme.colorMappings.primary};
  padding: 3px 15px 4px 10px !important;

  @media (max-width: ${({ theme }) => theme.mid}) {
    font-size: 18px;
  }

  span {
    line-height: 1.1;
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
`;
