import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { getCardColor } from './CardThemes';
import {MdOutlineVideogameAssetOff} from 'react-icons/md';

/*
    _id
    :625b22853323612bb4f1f469
    mnemonic:"LD"
    bytes:1
    cycles:
    Array
        0:8
    operands:Array
        0:Object
            name
            :"BC"
            immediate
            :false
        1:Object
            name
            :"A"
            immediate
            :true
    immediate:false
    flags:Object
        Z:"-"
        N:"-"
        H:"-"
        C:"-"
    hexCode:"0x02"
*/

const OpcodeCardSmallFiller = ({rowStart, colStart}) => {
    
    const theme = getCardColor();

    return(
        <ThemeProvider theme={theme}>
            {/* <Cube rowStart={rowStart} colStart={colStart}> */}
                {/* <Side></Side> */}
                <Front rowStart={rowStart} colStart={colStart}>
                    <div>
                        -
                    </div>
                    <div>
                        <MdOutlineVideogameAssetOff/>
                    </div>

                </Front>
                {/* <Bottom></Bottom> */}
            {/* </Cube> */}
            
        </ThemeProvider>    
    );
};

const Cube = styled.div`
    position: relative;
    width: 5em;
    height: 5em;
    grid-column-start:${props => props.colStart+1};
    grid-column-end: ${props => props.colStart+2};
    grid-row-start:${props => props.rowStart+1};
    grid-row-end:${props => props.rowStart+2};
    border-radius: 10px;
`;

const Front = styled.div`
    /* position: absolute; */
    background-color: ${props => props.theme.primary};
    /* width: 5em; */
    /* height: 5em; */
    display: flex;
    flex-direction: column;
    align-items: center;
    
    margin: 2px;

    grid-column-start:${props => props.colStart+1};
    grid-column-end: ${props => props.colStart+2};
    grid-row-start:${props => props.rowStart+1};
    grid-row-end:${props => props.rowStart+2};
    border-radius: 5px;
    /* transform: translate(0.5em); */
`;

const Side = styled.div`

    width: 0.5em;
    height: 5em;
    background-color: ${props => props.theme.secondary};

    position: absolute;
    transform-origin: top right;
    transform: skew(0,-45deg);
    
`;

const Bottom = styled.div`
    width: 5em;
    height: 0.5em;
    background-color: ${props => props.theme.secondary};
    position: absolute;
    transform-origin: top right;
    transform: translate(0.5em, 5em) skew(-45deg);
`;



export default OpcodeCardSmallFiller;