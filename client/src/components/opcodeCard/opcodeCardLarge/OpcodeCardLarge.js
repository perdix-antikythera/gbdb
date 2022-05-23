import React from "react";
import { config } from "react-spring";
// import Popup from 'reactjs-popup';
import ReactTooltip from 'react-tooltip';
import {animated, useSpring} from 'react-spring';
import styled, { ThemeProvider, keyframes } from "styled-components";
import { getCardColor } from '../CardThemes';

const catText = 'The operation category.';
const hexText = 'The hexadecimal value of this opcode.';
const mnemText = 'A mnemomic version of the operand name.';
const tBytesText = 'The total number of bytes taken by this operation and any arguments.';
const cycText = ' The number of machine cycles taken by this operation to run. If this operation branches, this is denoted (cycles taken if true)/(cycles taken if false).';
const opIdxText = 'The index of this operand. Operands are 0 -indexed.';
const oppImmText = 'An operand is considered immediate if we are not interpreting its value to be a memory address.';
const oppBytes = 'The total number of bytes taken by this operand.';
const oppName = 'The shorthand name of this operand.'
const immText = 'An operation is considered immediate if all of its operands run on immediate data. ' + oppImmText;
const zText = 'The Z flag denotes whether an operation returns 0 or not.'
const nText = 'The N flag denotes if an operation performs a subtraction or not.';
const cText = 'The C flag denotes if an an operation caused an overflow, i.e. a carry from bit 7 to bit 8 (assuming 0 indexing of bits)';
const hText = 'The H flag denotes if an operation caused a carry from bit 3 to bit 4';
const noChangeText = '- : The flag is unchanged by this operation.';
const setZeroText = '0: The flag is always set to 0 by this operation.';
const setOneText = '1: The flag is always set to 1 by this operation.';
const setEffectText = ': The flag is set conditionally based on the outcome of the operation.';

const getCategoryFormatted = (category) => {
    switch(category) {
        case 'eightBitLd':{
            return '8 Bit Load Operation';
        }
        
        case 'sixteenBitLd':{
            return '16 Bit Load Operation';
        }

        case 'eightBitAlu':{
            return '8 Bit ALU Operation';
        }

        case 'sixteenBitAlu':{
            return '16 Bit ALU Operation';
        }

        case 'jp':{
            return 'Jump Operation';
        }

        case 'reg':{
            return 'Register Bitwise Operation';
        }

        case 'control': {
            return 'Control Operation';
        }

        case 'illegal': {
            return 'Illegal Operation';
        }

        default:
            return 'Hey';
        
    }
}


export const OpcodeCardLarge = ({
    mnemonic,
    bytes,
    cycles,
    hexCode,
    operands,
    immediate,
    flags,
    category, 
    onClick,
    xPos,
    yPos,
    xOverflow,
    yOverflow,
}) => {

    const theme = getCardColor(mnemonic, operands);

    // TT -> Tool Tip
    // States to keep track of all the tooltips
    const [toolTip, setToolTip] = React.useState(true);
    

    const handleMouseEnter = (stateFn) => stateFn(true);
    const handleMouseLeave = (stateFn) => {
        stateFn(false);
        setTimeout(() => stateFn(true), 25);
    };

    const handleTTEnter = (evt) => {
        evt.preventDefault();
        handleMouseEnter(setToolTip);
    };

    const handleTTExit = (evt) => {

        evt.preventDefault();
        handleMouseLeave(setToolTip);
    };



    const computeFlagText = (flag) => {
        switch(flag){
            case '0':{
                return setZeroText;
            }

            case '1':{
                return setOneText;
            }

            case '-':{
                return noChangeText;
            }

            case 'Z':{
                return zText;
            }

            case 'N':{
                return hText;
            }

            case 'H':{
                return hText;
            }

            case 'C':{
                return cText;
            }

            default:{
                return '';
            }
        }
    };

    const constructName = () => {
        let name = `${mnemonic} `;
        if(operands.length >= 1){
            name += `${operands[0].name} ` ;
        }

        if(operands.length >= 2){
            name += operands[1].name;
        }

        return name;
    }


    return (
        <ThemeProvider theme={theme}>

            <Container onClick={onClick} xPos={xPos} yPos={yPos} xOverflow={xOverflow} yOverflow={yOverflow}>
                {/* Category */}
                    {toolTip &&
                        <StyledReactTooltip
                            id="tt"
                            place="bottom"
                            type="warning"
                            effect="float"
                            multiline={true}
                            showToolTip={false}
                        >
                        </StyledReactTooltip>

                    }
                    <Title>{constructName()}</Title>

                    
                    <div >
                        <a 
                        data-tip={catText} 
                        data-for="tt"
                        onMouseEnter={handleTTEnter}
                        onMouseLeave={handleTTExit}
                        >
                            {getCategoryFormatted(category)}
                        </a>
                    </div>
                {/* Hex & Mnemonic */}
                <Row>

                    <Item>
                        <Heading
                            data-tip={hexText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                            >
                        Hex Code</Heading>
                        <div>{hexCode}</div>
                    </Item>
                    
                    <Item>
                        <Heading
                            data-tip={mnemText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >Mnemonic</Heading>
                        <div>{mnemonic}</div>
                    </Item>
                    <div>
                        <Heading
                            data-tip={tBytesText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >Total Size in Bytes</Heading>
                        <div>{bytes}</div>
                    </div>
                </Row>
                {/* Immediate & cycles */}
                <Row>
                    <Item>
                        <Heading
                            data-tip={immText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >Immediate</Heading>
                        <div>{immediate ? 'True' : 'False'}</div>
                    </Item>
                    <Item>
                        <Heading
                            data-tip={cycText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >Cycles</Heading>
                        {
                            (cycles.length === 1) ? 
                            (<div>{cycles[0]}</div>) : (<div><div></div>On True/On False<div>{cycles[0]}/{cycles[1]}</div></div>)
                        }
                    </Item>
                </Row>
                {/* Operands */}
                <div>
                    {operands.length > 0 && operands.map((operand, idx) => <Row><Operand name={operand.name} index={idx} immediate={operand.immediate} bytes={operand.bytes}/></Row>)}
                </div>
                {/* Flags */}
                <Row>
                {toolTip &&
                        <StyledReactTooltip
                            id="zflag"
                            place="bottom"
                            type="warning"
                            effect="float"
                            multiline={true}
                            showToolTip={false}
                            getContent={() => computeFlagText(flags.Z)}
                        >
                        </StyledReactTooltip>
                    }
                    {toolTip &&
                        <StyledReactTooltip
                            id="nflag"
                            place="bottom"
                            type="warning"
                            effect="float"
                            multiline={true}
                            showToolTip={false}
                            getContent={() => computeFlagText(flags.N)}
                        >
                        </StyledReactTooltip>
                    }
                    {toolTip &&
                        <StyledReactTooltip
                            id="hflag"
                            place="bottom"
                            type="warning"
                            effect="float"
                            multiline={true}
                            showToolTip={false}
                            getContent={() => computeFlagText(flags.H)}
                        >
                        </StyledReactTooltip>
                    }
                    {toolTip &&
                        <StyledReactTooltip
                            id="cflag"
                            place="bottom"
                            type="warning"
                            effect="float"
                            multiline={true}
                            showToolTip={false}
                            getContent={() => computeFlagText(flags.H)}
                        >
                        </StyledReactTooltip>
                    }
                    <Item>
                        <Heading
                            data-tip={zText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >Z</Heading>
                        <div>
                            <a
                                data-tip
                                data-for='zflag'
                                onMouseEnter={handleTTEnter}
                                onMouseLeave={handleTTExit}
                            >{flags.Z}</a>
                        </div>
                        
                    </Item>
                    <Item>
                        <Heading
                            data-tip={nText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >N</Heading>
                        <div>
                            <a
                            data-tip
                            data-for='nflag'
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                            >
                                {flags.N}
                            </a>
                            
                        </div>
                    </Item>
                    <Item>
                        <Heading
                            data-tip={hText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >H</Heading>
                        <div>
                            <a
                            data-tip
                            data-for='hflag'
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                            >
                                {flags.H}
                            </a>
                            
                        </div>
                    </Item>
                    <Item>
                        <Heading
                            data-tip={cText} 
                            data-for="tt"
                            onMouseEnter={handleTTEnter}
                            onMouseLeave={handleTTExit}
                        >C</Heading>
                        <div>
                            <a
                                data-tip
                                data-for='cflag'
                                
                            >
                                {flags.C}
                            </a>
                            
                        </div>
                    </Item>
                </Row>
            </Container>

        </ThemeProvider>
    );

};

const Operand = ({name, immediate, bytes, index }) => {
    
    const [toolTipOp, setToolTipOp] = React.useState(true);

    const handleMouseEnter = (stateFn) => stateFn(true);
    const handleMouseLeave = (stateFn) => {
        stateFn(false);
        setTimeout(() => stateFn(true), 25);
    };

    const handleTTEnter = (evt) => {
        evt.preventDefault();
        handleMouseEnter(setToolTipOp);
    };

    const handleTTExit = (evt) => {

        evt.preventDefault();
        handleMouseLeave(setToolTipOp);
    };

    return(
        <OperandContainer>
            {toolTipOp &&
                <StyledReactTooltip
                    id={`ttOp${index}`}
                    place="bottom"
                    type="warning"
                    effect="float"
                    multiline={true}
                    showToolTip={false}
                >
                </StyledReactTooltip>

            }
            <Item>
                <Heading
                    data-tip={opIdxText} 
                    data-for={`ttOp${index}`}
                    onMouseEnter={handleTTEnter}
                    onMouseLeave={handleTTExit}
                >Index</Heading>
                <div>{index}</div>
            </Item>
            <Item>
                <Heading
                    data-tip={oppName} 
                    data-for={`ttOp${index}`}
                    onMouseEnter={handleTTEnter}
                    onMouseLeave={handleTTExit}
                >Name</Heading>
                <div>{name}</div>
            </Item>
            {immediate &&
            <Item>
                <Heading
                    data-tip={oppImmText} 
                    data-for={`ttOp${index}`}
                    onMouseEnter={handleTTEnter}
                    onMouseLeave={handleTTExit}
                >Immediate</Heading>
                <div>{immediate? 'True': 'False'}</div>
            </Item>}
            {bytes && 
            <Item>
                <a
                    data-tip={oppBytes} 
                    data-for={`ttOp${index}`}
                    onMouseEnter={handleTTEnter}
                    onMouseLeave={handleTTExit}
                >Size in Bytes</a>
                <div>{bytes}</div>
            </Item>}
        </OperandContainer>
    )
};

const FlagInfo = ({flag}) => {

};

const animation = keyframes`
    0% {transform: scale(0.75)}
    100% {transform: scale(1)}
`

const Container = styled.div`
    position: absolute;
    /* top: ${props => props.yPos}px;//50%;
    left: ${props => props.xPos}px;//50%; */
    ${props => props.xOverflow? `right: calc(1vw);`: `left:${props.xPos}px;`}
    ${props => props.yOverflow? `bottom: calc(1vh);`: `top:${props.yPos}px;`}
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.secondary};
    border: 10px solid;
    border-radius: 5px;
    border-color: ${props => props.theme.primary};
    padding: 10px;
    z-index: 1000;
    animation: ${animation} ease-in-out 400ms;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
`;

const OperandContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Item = styled.div`
    padding-right: 10px;
`;

const StyledReactTooltip = styled(ReactTooltip)`
    max-width: 250px !important;
`
const Title = styled.h1`
    font-size: 14pt;
    font-weight: bold;
`;

const Heading = styled.a`
    font-size: 10pt;
    font-weight: bold;
`;

export default OpcodeCardLarge;