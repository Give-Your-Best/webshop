import * as React from 'react';
import { StyledSelect } from '../Select';
import { name } from '../../../utils/helpers';

export const UserSelect = ({ users, selectName, fieldPlaceholder, disabled }) => {
  return (
    <StyledSelect name={`${selectName}`} placeholder={fieldPlaceholder || 'Select an option'} disabled={disabled}>
        {users.map((d)=>{
            return (<StyledSelect.Option key={d._id} value={d._id}>{name(d)}</StyledSelect.Option>);
        })}
    </StyledSelect>
  );
};
