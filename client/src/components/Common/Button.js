import React from 'react';
import styled from 'styled-components';
import {animated, useSpring} from 'react-spring';

export const Button = ({onClick, children}) => {
    return (
        <Hover scale={0.9} tension={100}><ButtonWrapper onClick={onClick}>{children}</ButtonWrapper></Hover>
        
    )
};

const ButtonWrapper = styled.button`
    border: none;
    text-decoration: none;
    background-color: rgb(156, 17, 126);
    border-radius: 50%;
    color: white;
    height: 30px;
    width: 30px;
`;

export const SelectButton = ({onClick, height, width, children}) => {
    return (
    <Hover scale={0.9} tension={100}>
        <SelectButtonWrapper onClick={onClick} height={height} width={width}>{children}</SelectButtonWrapper>
    </Hover>)
    
}

const SelectButtonWrapper = styled.button`
    border: none;
    text-decoration: none
    background-color: darkgrey;
    border-radius: 10px;
    ${props => props.height?`height: ${props.height}px;`:''}
    ${props => props.width?`width: ${props.width}px;`:''}
`;

// Animations

export const Hover = ({
    x = 0,
    y = 0,
    rotation = 0,
    scale = 1,
    timing = 150,
    tension=250,
    friction=15,
    children
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const handleHover = () => setIsHovered(true);

    React.useEffect(() => {
        if(!isHovered){
            return;
        }

        const timeout = window.setTimeout(() => {
            setIsHovered(false);
        }, timing);

        return () => {
            window.clearTimeout(timeout);
          };

    }, [isHovered, timing]);




    const animation = useSpring({
        backfaceVisibility: 'hidden',
        transform: isHovered ?
        `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})
        `
    :   `translate(0px,0px)
         rotate(0deg)
         scale(1)
        `,
    config:{
        tension: `${tension}`,
        friction: `${friction}`,
    }
    });

    return(
        <animated.span onMouseEnter={handleHover} style={animation}>{children}</animated.span>
    )
};