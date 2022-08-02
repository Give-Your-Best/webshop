import * as React from 'react';
import { StyledSelect } from '../Select';
import { name } from '../../../utils/helpers';

export const UserSelect = ({ users, selectName, fieldPlaceholder, disabled }) => {
  return (
    <StyledSelect 
      name={`${selectName}`} 
      placeholder={fieldPlaceholder || 'Select an option'} 
      disabled={disabled}
      showSearch={true}
      optionFilterProp="children"
      filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
      filterSort={(optionA, optionB) =>
        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
      }
    >
        {users.map((d)=>{
            return (<StyledSelect.Option key={d._id} value={d._id}>{name(d)}</StyledSelect.Option>);
        })}
    </StyledSelect>
  );
};