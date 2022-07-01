import styled from 'styled-components';

export const ColourCircles = styled.span`
    width: 20px;
    height: 20px;
    border-radius: 100%;
    padding: 0 1px;
    margin: 1px 5px;
    vertical-align: middle;
    display:inline-block;
    background: ${props => (props.colour ? (props.colour === 'Neutral')? '#bfab8e': props.colour.toLowerCase() : '')};
`
