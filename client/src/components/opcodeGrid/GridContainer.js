import React from "react";
import OpcodesContext from "../../contexts/opcodes/OpcodesContext";
import OpcodeGrid from "./OpcodeGrid";
import SearchHeader from "../header/SearchHeader";
import { SelectButton } from "../Common/Button";
import styled from "styled-components";
import Loader from '../Loader/Loader'

export const GridContainer = () => {
    const {
        opcodes,
        prefixed,
        unprefixed,
        status,
        actions:{
            getOpcodes
        }
    } = React.useContext(OpcodesContext);

    const [codeType, setCodeType] = React.useState(unprefixed);
    const [prefixedFlag, setPrefixedFlag] = React.useState(false);

    const callOpcodeService = async () => {
            await getOpcodes();
    }

    React.useEffect(() => {
        callOpcodeService();
    }, []);

    React.useEffect(() => {
        if(prefixedFlag){
            setCodeType(prefixed);
        }
        else{
            setCodeType(unprefixed);
        }
    }, [opcodes, prefixedFlag])

    const handlePrefixedClick = (evt) => {
        evt.preventDefault();
        setCodeType(prefixed);
        setPrefixedFlag(true);
    } 

    const handleUnprefixedClick = (evt) => {
        evt.preventDefault();
        setCodeType(unprefixed);
        setPrefixedFlag(false);
    }

    return(<>
            <div>
                <SearchHeader/>
            </div>
            {status === 'idle' ?
                <div>
                    
                    <Container>
                        <RotatedBtnContainer>
                            <SelectButton height={25} width={95} onClick={handleUnprefixedClick}></SelectButton>
                            <div>Unprefixed</div>
                        </RotatedBtnContainer>
                        <RotatedBtnContainer>
                            <SelectButton height={25} width={95} onClick={handlePrefixedClick}></SelectButton>
                            <div>Prefixed</div>
                        </RotatedBtnContainer>
                        
                    </Container>
                    <Bezel>
                            <LineContainer>
                                <PinkHR/>
                                <BlueHR/>
                                <BezelTitle>DOT MATRIX WITH STEREO SOUND</BezelTitle>
                            </LineContainer>
                        <OpcodeGrid codesToDisplay={codeType} prefixed={prefixedFlag} />
                    </Bezel>
                    
                </div> :
                <Loader/>
            }</>
    )



}

const Container = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px 5px;
`

const RotatedBtnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    transform: rotate(-15deg);
`;

export const Bezel = styled.div`
    background-color: #808080;
    padding: 20px 40px;
    border-radius: 10px;
    border-bottom-right-radius: 40px; 
    width: 95%;
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 3px solid;
    border-color: slategrey;

`;

export const BezelTitle = styled.div`
    color: lightgrey;
    background-color:#808080; 
    transform-origin: 50% 50%;
    position: absolute;
    left: 50%;
    top: 1px;
    z-index: 1;
    padding: 0px 10px;

`

export const LineContainer = styled.div`
    width: 100%;
    margin: 5px;
    position: relative;
`

export const BlueHR = styled.hr`
    color: var(--color-lightblue);
`;

export const PinkHR = styled.hr`
    color: rgb(156, 17, 126);

`