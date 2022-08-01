import styled from 'styled-components';
import { Box } from '../../../components';

export const ImagesWrapper = styled.div`
    display:flex;
    width: 50%;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        width: 100%;
    }

    > img {
        width: 80%;
        height: auto;
        margin-left: 10px;
        border-radius: 10px;
        background: white;
    }
`

export const MiniImagesWrapper = styled(props => <Box {...props} />)`
    display:inline;
    max-width: 20%;
    min-width: 20%;

    > img {
    width: 100%;
    height: auto;
    max-height: 200px;
    border-radius: 10px;
    background: white;
    margin: 5px 0;
    cursor: pointer;
    }
`;