import React from 'react';
import { useField } from 'formik';
import {
  StyledCheckboxGroup,
  StyledLabel,
  StyledError,
} from './EditForm.styles';

const CheckboxGroupField = ({ options, name, label }) => {
  const field = useField(name);

  return (
    <div>
      <StyledLabel>
        {label}
        <StyledCheckboxGroup {...field} name={name} options={options} />
      </StyledLabel>
      <StyledError name={name} component="div" />
    </div>
  );
};

export default CheckboxGroupField;
