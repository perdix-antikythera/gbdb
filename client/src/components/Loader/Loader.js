import React from 'react';
import styled, {keyframes} from 'styled-components';
import {MdGamepad} from 'react-icons/md';
import {useSpring, animated} from 'react-spring';

const Loader = () => {

    // const style = useSpring({
    //     transform: 'rotate(360deg)',
    //     from: {
    //         transform: 'rotate(0deg)',
    //     },
    //     config:{
    //         tension: 10,
    //         friction: 1,
    //     },
    // });

    return (
        <Wrapper>
            Loading
            <Spinner>
                <MdGamepad size={50}/>
            </Spinner>
        </Wrapper>
    );

};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const rotation = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

const scale = keyframes`
    0% {
    }

    50%{
        transform: scale(0.5);
    }

    100%{

    }
`;

const Spinner = styled.div`
    animation: ${scale} 2000ms forwards;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;

    //transform-origin: 50% 50%;

`;


export default Loader;
