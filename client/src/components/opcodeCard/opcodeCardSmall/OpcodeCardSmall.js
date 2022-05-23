import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { getCardColor } from '../CardThemes';

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

const OpcodeCardSmall = ({mnemonic, cycles, operands, flags, hexCode, rowStart, colStart, onClick}) => {
    const theme = getCardColor(mnemonic, operands);
    
    const getTitleString = (mnemonic, operands) => {
        let titleString = '';
        switch(operands.length){
            case 0:{
                titleString = mnemonic;
                break;
            }
            
            case 1:{
                titleString = `${mnemonic} ${operands[0].name}`;
                break;
            }

            case 2:{
                titleString = `${mnemonic} ${operands[0].name}, ${operands[1].name}`;
                break;
            }

            case 3:{
                titleString = `${mnemonic} ${operands[0].name}, ${operands[1].name}+${operands[2].name}`;
                break;
            }

            default:{
                titleString = 'ERROR';

            }
        }

        return titleString;
    };

    const getCycleString = (cycles) => {
        let cyclesString = '';

        switch(cycles.length){
            case 1:{
                cyclesString = `${cycles[0]}`;
                break;
            }

            case 2:{
                cyclesString = `${cycles[0]}/${cycles[1]}`;
                break;
            }

            default:{
                cyclesString = 'ERROR';
            }
        }

        return cyclesString;
    };

    const getFlagString = (flags) => {
        return `${flags.Z} ${flags.N} ${flags.H} ${flags.C}`
    }

    return(
            <ThemeProvider theme={theme} >
                <Cube rowStart={rowStart} colStart={colStart} >
                    <Side></Side>
                    <Front>
                        <div>
                            {getTitleString(mnemonic, operands)}
                        </div>
                        <div>
                            {getCycleString(cycles)}
                        </div>
                        <div>
                            {getFlagString(flags)}
                        </div>
                    </Front>
                    <Bottom></Bottom>
                </Cube>
            
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
`;

const Front = styled.div`
    position: absolute;
    background-color: ${props => props.theme.primary};
    width: 5em;
    height: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;

    transform: translate(0.5em);
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



export default OpcodeCardSmall;