import styled from 'styled-components';
import { SubmitButton, Input, Checkbox, InputNumber, Form, Radio, Select, AutoComplete } from 'formik-antd';
import { ErrorMessage } from 'formik';

const StyledError = styled(ErrorMessage)`
  border: 1px solid red;
  width: max-content;
  padding: 1px 5px;
  color: red;
  margin: 5px 0;
  font-size: 20px;
`

const StyledSelect = styled(Select)`
    width: 100%;
    font-size: 20px;
    min-width: 400px;
    color: ${({ theme }) => theme.colorMappings.primary};
  &:disabled {
    background-color: transparent;
    color: black;
    border: none;
  }
`

const StyledSubmitButton = styled(SubmitButton)`
  font-family: lato;
  cursor: pointer;
  background: ${({ theme }) => theme.colorMappings.blue};
  font-size: 18px;
  cursor: pointer;
  border-radius: 0.1rem;
  border: 2px solid ${({ theme }) => theme.colorMappings.primary} !important;
  min-height: 44px;
  color: ${({ theme }) => theme.colorMappings.primary};
  margin: 1em 5px 1em 0;
  padding: 0.3rem 1rem;
  border-width: 0.1rem;
  :hover {
    background: ${({ theme }) => theme.colorMappings.blue};
    border-radius: 0.1rem;
    border: 2px solid ${({ theme }) => theme.colorMappings.primary};
    color: ${({ theme }) => theme.colorMappings.primary};
  }
  :focus {
    background: ${({ theme }) => theme.colorMappings.blue};
    border-radius: 0.1rem;
    border: 2px solid ${({ theme }) => theme.colorMappings.primary};
    color: ${({ theme }) => theme.colorMappings.primary};
  }
`
const StyledInput = styled(Input)`
  width: min-content;
  min-width: 400px;
  border: 1px solid ${({ theme }) => theme.colorMappings.primary};
  color: ${({ theme }) => theme.colorMappings.primary};
  margin: 0.2em 1em 0.5em 0;
  padding: 2px 5px;
  display: block;
  font-size: 20px;
  &:disabled {
    background-color: transparent;
    color: ${({ theme }) => theme.colorMappings.primary} !important;
  }
`

const StyledInputArea = styled(Input.TextArea)`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colorMappings.primary};
  color: ${({ theme }) => theme.colorMappings.primary};
  margin: 0.2em 1em 0.5em 0;
  padding: 2px 5px;
  display: block;
  font-size: 20px;
  &:disabled {
    background-color: transparent;
    color: ${({ theme }) => theme.colorMappings.primary} !important;
  }
`

const StyledAutoComplete = styled(AutoComplete)`
  width: 100%;
  color: ${({ theme }) => theme.colorMappings.primary};

  .ant-select-selector {
    border: 1px solid ${({ theme }) => theme.colorMappings.primary} !important;
    color: ${({ theme }) => theme.colorMappings.primary} !important;
    margin: 0.2em 1em 0.5em 0;
    padding: 2px 5px;
    display: block;
    font-size: 20px;
    height: 36px !important;
  }
  &:disabled {
    background-color: transparent;
    color:  ${({ theme }) => theme.colorMappings.primary} !important;
  }
  &:placeholder {
    background-color: transparent;
    color:  ${({ theme }) => theme.colorMappings.primary} !important;
  }
`

const StyledInputPassword = styled(Input.Password)`
  width: max-content;
  min-width: 400px;
  border: 1px solid ${({ theme }) => theme.colorMappings.primary};
  color: ${({ theme }) => theme.colorMappings.primary};
  margin: 0.2em 1em 0.5em 0;
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
`

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
`

const StyledCheckbox = styled(Checkbox)`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.colorMappings.primary};
  font-size: 20px;

  & .ant-checkbox-checked .ant-checkbox-inner {
    background-color: transparent !important;
    border: 1px solid ${({ theme }) => theme.colorMappings.primary}!important;
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.colorMappings.primary};
  }
`

const StyledCheckboxGroup = styled(Checkbox.Group)`
  color: ${({ theme }) => theme.colorMappings.primary};
  font-size: 20px;

  .ant-checkbox-wrapper {
    color: ${({ theme }) => theme.colorMappings.primary};
    margin: 3px;
    font-size: 20px;
  }
`

const StyledRadio = styled(Radio)`
  margin: 0;
  padding: 0;
  font-size: 20px;
  color: ${({ theme }) => theme.colorMappings.primary};

    span {
      font-size: 20px;
    }
`

const StyledLabel = styled.label`
  display: inline-block;
  margin: 1px 0;
  color: ${({ theme }) => theme.colorMappings.primary};
  font-size: 20px !important;
`

const StyledForm = styled(Form)`
  font-size: 20px;
  position: relative;
  color: ${({ theme }) => theme.colorMappings.primary};
`

const InfoNote = styled.p`
  font-size; 9px;
  color: ${({ theme }) => theme.colorMappings.primary};
  text-decoration: italic;
`

export { StyledInput, 
  StyledSubmitButton, 
  StyledCheckbox, 
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
  StyledInputArea
};