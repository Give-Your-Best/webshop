import styled from 'styled-components';
import { Checkbox } from 'formik-antd';

const StyledCheckbox = styled(Checkbox)`
    span&:disabled {
        background-color: transparent;
        color: black;
        border: none;
    }
`
export { StyledCheckbox };