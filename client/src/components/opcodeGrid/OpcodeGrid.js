import React from 'react';
import styled from 'styled-components';
import clone from 'just-clone';
import OpcodesContext from '../../contexts/opcodes/OpcodesContext'
import OpcodeCardSmall from '../opcodeCard/opcodeCardSmall/OpcodeCardSmallV2';
import OpcodeCardLarge from '../opcodeCard/opcodeCardLarge/OpcodeCardLarge';
import OpcodeCardSmallFiller from '../opcodeCard/OpcodeCardSmallFiller';
import Loader from '../Loader/Loader';


// Array of strings representing hex numbers
const headerArr = [...Array(16).keys()].map(elt => elt.toString(16));

const OpcodeGrid = ({codesToDisplay, prefixed}) => {
    const {
        // opcodes,
        state,
        actions:{
            getOpcodes
        }
    } = React.useContext(OpcodesContext);

    const [showDetailCard, setShowDetailCard] = React.useState(false);
    const [selectedOpcode, setSelectedOpcode] = React.useState({});
    const [mousePos, setMousePos] = React.useState({x:0, y:0});
    const [xOverflow, setXOverflow] = React.useState(false);
    const [yOverflow, setYOverflow] = React.useState(false);

    const gridContainerRef = React.useRef(null);

    const opcodes = codesToDisplay;
    //This array tells us which coordinates of the grid the service was able to populate based on the users input
    let gridCoords = [];
    let gridRow = Array(16).fill(false);
    for(let i = 0; i < 16; i++){
        gridCoords.push(clone(gridRow));
    }

    const handleMouseMove = (evt) => {
        if(!showDetailCard){
            const bounds = gridContainerRef.current.getBoundingClientRect();

            setMousePos({x:(evt.clientX - bounds.left), y:(evt.clientY-bounds.top)});
            if(evt.clientX - bounds.left + 250 > bounds.right){
                setXOverflow(true);
            } else {
                setXOverflow(false);
            }

            if(evt.clientY - bounds.top + 330 > bounds.bottom){
                setYOverflow(true);
            } else {
                setYOverflow(false);
            }
        }
        
    };

    // Check to see what indices need to be populated
    if(opcodes){
        opcodes.forEach(opcode => {
            const col = Number('0x' + (prefixed? opcode.hexCode[5]:opcode.hexCode[3]));
            const row = Number('0x' + (prefixed? opcode.hexCode[4]:opcode.hexCode[2]));
            
            gridCoords[row][col] = true;
        })
    }

    

    return(
        <>
            {(state === 'idle') ? <Loader/>:
            <GridContainer ref={gridContainerRef} onMouseMove={handleMouseMove}>
                {
                    showDetailCard && selectedOpcode &&
                    <OpcodeCardLarge
                        mnemonic={selectedOpcode.mnemonic}
                        cycles={selectedOpcode.cycles}
                        operands={selectedOpcode.operands}
                        bytes={selectedOpcode.bytes}
                        flags={selectedOpcode.flags}
                        hexCode={selectedOpcode.hexCode}
                        category={selectedOpcode.category}
                        onClick={() => setShowDetailCard(false)}
                        xPos={mousePos.x}
                        yPos={mousePos.y}
                        xOverflow={xOverflow}
                        yOverflow={yOverflow}
                    />
                }
                <NewGrid>
                    <CornerItem colStart={1}><div>0x<Colspan>C</Colspan><Rowspan>R</Rowspan></div></CornerItem>
                    {headerArr.map((elt, idx) => (<HeaderItem colStart={idx+1}><div>{elt}</div></HeaderItem>))}
                    {headerArr.map((elt, idx) => (<SideItem rowStart={idx+1}><div>{elt}</div></SideItem>))}
                    
                    {opcodes && opcodes.map(opcode => {
                                return (
                                    <OpcodeCardSmall
                                        mnemonic={opcode.mnemonic}
                                        cycles={opcode.cycles}
                                        operands={opcode.operands}
                                        flags={opcode.flags}
                                        hexCode={opcode.hexCode}
                                        key={opcode.hexCode}
                                        category={opcode.category}
                                        colStart={Number('0x' + (prefixed? opcode.hexCode[5]:opcode.hexCode[3]))+1}
                                        rowStart={Number('0x' + (prefixed? opcode.hexCode[4]:opcode.hexCode[2]))+1}
                                        onClick={(evt) => {
                                            evt.preventDefault();
                                            if(!showDetailCard){
                                                setShowDetailCard(true);
                                                setSelectedOpcode(opcode);
                                            }
                                        }}
                                    />
                                // </div>
                                )
                            }
                    )}
                    {
                        gridCoords && gridCoords.map((gridRow, rowIdx) => gridRow.map(
                            (elt, colIdx) => {
                                if(!elt){
                                    return <OpcodeCardSmallFiller rowStart={rowIdx+1} colStart={colIdx+1}/>
                                }
                            }
                        ))
                    } 
                </NewGrid>
            </GridContainer>    
            }
        </>
    )
}

const GridContainer = styled.div`
    position: relative;
    //background-color: #6F8566;
    
`;

const SideAndGrid = styled.div`
    display: flex;
`

const NewGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(17, 5.6vw [col-start]);
    grid-template-rows: repeat(17, 5.6vh [row-start]);
    /* column-gap: calc(5px);
    row-gap: calc(5px); */

`;

const HeaderItem = styled.div`
    /* grid-area: head; */

    
    grid-column-start:${props => props.colStart+1};
    grid-column-end: ${props => props.colStart+2};
    grid-row-start:1;
    grid-row-end:2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: salmon;
`;

const SideItem = styled.div`

    grid-column-start:1;
    grid-column-end:2;
    grid-row-start:${props => props.rowStart+1};
    grid-row-end:${props => props.rowStart+2};
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: lightblue;
    padding: 0px 15px !important;
    /* max-width: 12pt; */
`;

const CornerItem = styled.div`
    
    vertical-align: middle;
    text-align: center;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 2; 
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ivory;

`;

const Colspan = styled.span`
    background-color: lightblue;

`;
const Rowspan = styled.span`
    background-color: salmon;

`;

export default OpcodeGrid;