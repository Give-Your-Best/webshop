import styled from 'styled-components';

export const TextInput = styled.input`
  color: black;
  margin: .5em 0;
  background-color: #fff;
  border: 0.1rem solid grey;
  background-color: transparent;
  display: block;
  :focus {
    border: 0.1rem solid ${({ theme }) => theme.colorMappings.primary};
    outline: none;
  }
`;
