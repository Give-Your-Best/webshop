import styled from 'styled-components';
import {
  SubmitButton,
  Input,
  Checkbox,
  InputNumber,
  Form,
  Radio,
  Select,
  AutoComplete,
} from 'formik-antd';
import { ErrorMessage } from 'formik';

const StyledError = styled(ErrorMessage)`
  border: 1px solid red;
  width: 100%;
  padding: 1px 5px;
  color: red;
  margin: 5px 0;
  font-size: 20px;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  font-size: 20px;
  height: 42px;

  color: ${({ theme }) => theme.colorMappings.primary};

  .ant-select-selector {
    color: ${({ theme }) => theme.colorMappings.primary};
    border: 1px solid ${({ theme }) => theme.colorMappings.primary} !important;
    height: 42px;
  }

  .ant-select-arrow {
    color: ${({ theme }) => theme.colorMappings.primary};
  }

  .ant-select-item {
    color: ${({ theme }) => theme.colorMappings.primary};
    height: 42px;
  }

  .ant-select-selection-item {
    line-height: 2 !important;
  }

  &:disabled {
    background-color: transparent;
    color: black;
    border: none;
  }
`;

const StyledSubmitButton = styled(SubmitButton)`
  width: 150px;
  float: right;
  cursor: pointer;
  background: ${({ theme }) => theme.colorMappings.yellow};
  font-weight: bold;
  font-size: 22px;
  cursor: pointer;
  border-radius: 0.1rem;
  border: 2px solid ${({ theme }) => theme.colorMappings.buttonBorder} !important;
  min-height: 52px;
  color: ${({ theme }) => theme.colorMappings.primary};
  margin: 5px;
  padding: 0.3rem 1rem;
  border-width: 0.1rem;
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
  @media (max-width: ${({ theme }) => theme.mid}) {
    font-size: 18px;
    min-height: 46px;
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    min-height: 44px;
  }
`;
const StyledInput = styled(Input)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colorMappings.primary};
  color: ${({ theme }) => theme.colorMappings.primary};
  margin: 0.2em 1em 0.5em 0;
  height: 42px;
  padding: 2px 5px;
  display: block;
  font-size: 20px;
  &:disabled {
    background-color: transparent;
    color: ${({ theme }) => theme.colorMappings.primary} !important;
  }
`;

const StyledInputArea = styled(Input.TextArea)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colorMappings.primary};
  color: ${({ theme }) => theme.colorMappings.primary};
  margin: 0.2em 1em 0.5em 0;
  height: 42px;
  padding: 2px 5px;
  display: block;
  font-size: 20px;

  &:disabled {
    background-color: transparent;
    color: ${({ theme }) => theme.colorMappings.primary} !important;
  }
`;
const StyledInputAreaInLine = styled(Input.TextArea)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colorMappings.primary};
  color: ${({ theme }) => theme.colorMappings.primary};
  margin: 0 1em 0 0;
  height: 42px;
  padding: 2px 5px;
  display: block;
  font-size: 20px;

  &:disabled {
    background-color: transparent;
    color: ${({ theme }) => theme.colorMappings.primary} !important;
  }
`;

const StyledAutoComplete = styled(AutoComplete)`
  width: 100%;
  color: ${({ theme }) => theme.colorMappings.primary};

  .ant-select-selector {
    border: 1px solid ${({ theme }) => theme.colorMappings.primary} !important;
    color: ${({ theme }) => theme.colorMappings.primary} !important;
    margin: 0.2em 1em 0.5em 0;
    height: 42px;
    padding: 2px 5px;
    display: block;
    font-size: 20px;
    height: 36px !important;
  }
  &:disabled {
    background-color: transparent;
    color: ${({ theme }) => theme.colorMappings.primary} !important;
  }
  &:placeholder {
    background-color: transparent;
    color: ${({ theme }) => theme.colorMappings.primary} !important;
  }
`;

const StyledInputPassword = styled(Input.Password)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colorMappings.primary};
  color: ${({ theme }) => theme.colorMappings.primary};
  margin: 0.2em 1em 0.5em 0;
  height: 42px;
  padding: 2px 5px;
  display: flex;
  font-size: 20px;

  .ant-input {
    font-size: 20px;
  }

  &:disabled {
    background-color: transparent;
    color: black;
  }

  .anticon svg {
    color: ${({ theme }) => theme.colorMappings.primary};
  }
`;

const StyledInputNumber = styled(InputNumber)`
  width: 70px;
  color: ${({ theme }) => theme.colorMappings.primary};
  border: 1px solid ${({ theme }) => theme.colorMappings.primary};
  margin: 0;
  padding: 0;
  display: block;
  height: 30px;
  background-color: transparent;
  color: ${({ theme }) => theme.colorMappings.primary};
  background: transparent;
  font-size: 20px;
  &:disabled {
    background-color: transparent;
    color: black;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colorMappings.primary};
  font-size: 20px;

  span {
    font-size: 20px;
    height: 18px;
  }

  & .ant-checkbox-checked .ant-checkbox-inner {
    border: 1px solid ${({ theme }) => theme.colorMappings.primary} !important;
  }
`;

const StyledCheckboxGroup = styled(Checkbox.Group)`
  color: ${({ theme }) => theme.colorMappings.primary};
  font-size: 20px;

  .ant-checkbox-wrapper {
    color: ${({ theme }) => theme.colorMappings.primary};
    margin: 3px;
    font-size: 20px;
  }

  .ant-checkbox-inner {
    border: 1px solid ${({ theme }) => theme.colorMappings.primary} !important;
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    border: 2px solid ${({ theme }) => theme.colorMappings.primary} !important;
  }
`;

const StyledRadio = styled(Radio)`
  margin: 0;
  padding: 0;
  font-size: 20px;
  color: ${({ theme }) => theme.colorMappings.primary};

  span {
    font-size: 20px;
  }
`;

const StyledLabel = styled.label`
  width: 100%;
  display: inline-block;
  margin: 1px 0;
  color: ${({ theme }) => theme.colorMappings.primary};
  font-size: 22px !important;
`;

const NewPasswordLink = styled.label`
  width: auto;
  display: inline-block;
  margin: 1px 0;
  text-decoration: underline;
  cursor: pointer;
  margin: 0;
  color: ${({ theme }) => theme.colorMappings.primary};
  font-size: 15px !important;
`;

const StyledForm = styled(Form)`
  font-size: 20px;
  position: relative;
  color: ${({ theme }) => theme.colorMappings.primary};
`;

const InfoNote = styled.p`
  font-size: 20px !important;
  margin-bottom: 0;
  color: ${({ theme }) => theme.colorMappings.primary};
`;

const SubHead = styled.p`
  font-size: 24px !important;
  text-align: center;
  font-weight: bold;
`;

const FieldContainerHalf = styled.div`
  display: flex;
  label {
    width: 50%;
  }

  label:first-child {
    margin-right: 10px;
  }
`;

const FieldContainerUneven = styled.div`
  display: flex;

  label {
    width: 40%;
    margin-right: 10px;
  }

  label:first-child {
    margin-right: 10px;
  }
`;

export {
  StyledInput,
  StyledSubmitButton,
  StyledCheckbox,
  SubHead,
  StyledInputNumber,
  StyledLabel,
  StyledForm,
  StyledRadio,
  StyledSelect,
  StyledError,
  InfoNote,
  StyledCheckboxGroup,
  StyledInputPassword,
  StyledAutoComplete,
  StyledInputArea,
  FieldContainerHalf,
  FieldContainerUneven,
  StyledInputAreaInLine,
  NewPasswordLink,
};
