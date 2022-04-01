import * as React from 'react';
import { StyledSelect } from '../../atoms';

export const UserSelect = ({ users, selectName, fieldPlaceholder, disabled }) => {
  return (
    <StyledSelect name={`${selectName}`} placeholder={fieldPlaceholder || 'Select an option'} disabled={disabled}>
        {users.map((d)=>{
            return (<StyledSelect.Option key={d._id} value={d._id}>{d.name || (d.firstName + ' ' + d.lastName)}</StyledSelect.Option>);
        })}
    </StyledSelect>
  );
};
