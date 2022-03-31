import styled from 'styled-components';
import { SubmitButton, Input, Checkbox, InputNumber } from 'formik-antd';

const StyledSubmitButton = styled(SubmitButton)`
  background-color: black;
`
const StyledInput = styled(Input)`
  &:disabled {
    background-color: transparent;
    color: black;
    border: none;
  }
`
const StyledInputNumber = styled(InputNumber)`
  &:disabled {
    background-color: transparent;
    color: black;
    border: none;
  }
`

const StyledCheckbox = styled(Checkbox)`
    span&:disabled {
        background-color: transparent;
        color: black;
        border: none;
    }
`

export { StyledInput, StyledSubmitButton, StyledCheckbox, StyledInputNumber };