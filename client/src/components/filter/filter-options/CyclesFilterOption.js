import React from 'react';
import Select from 'react-select'
import styled from 'styled-components';
import FilterContext from '../../../contexts/filter-v2-context/FilterContext';

import {
    cyclesOptions,
    operationOptions
} from '../FilterConstants';

import {
    InputWrapper,
    InputGroupWrapper
} from '../FilterStyles';

export const CyclesFilterOption = ({index, selectedValues,  setRowPayload, setValidated, isInactive}) => {
    
    const isDisabled = isInactive;
    const isClearable = !isInactive;
    // const[op, setOp] = React.useState((selectedValues && selectedValues.op)? (selectedValues.op): null);
    // const[cycles, setCycles] = React.useState((selectedValues && selectedValues.val)? selectedValues.val:null);
    const [op, setOp] = React.useState(null);
    const [cycles, setCycles] = React.useState(null);
    const [initialized, setInitialized] = React.useState(false);

    // if(selectedValues){
    //     if(selectedValues.op){
    //         setOp(selectedValues.op);
    //     }

    //     if(selectedValues.val){
    //         setCycles(selectedValues.cycles);
    //     }
    // }

    const {
        actions: {
            addRow,
            deleteRow
        }
    } = React.useContext(FilterContext);


    const inputRef = React.useRef(null);
    const cyclesOperation = React.useRef(null);

    const handleCycleChange = (evt) => {
        setCycles(evt.value);
    };

    const handleOpChange = (evt) => {
        setOp(evt.value);
    }

    // React.useEffect(() => {
    //     debugger;
    //     if(selectedValues){
    //         setCycles(selectedValues.val);
    //         setOp(selectedValues.op);
    //     }
    // }, []);

    React.useEffect(() => {
        if(op || cycles){
            debugger;
            let payload = {};
            if(op) payload.op = op;
            if(cycles) payload.val = cycles;
            
            
            if(op && cycles){
                setRowPayload({rowNum: index, filter:{cycles:payload}});
                setValidated(true);
            }
            
        }

        else{
            setValidated(false);
        }
    }, [op, cycles]);



    React.useEffect(() => {

        if(selectedValues){
            if(selectedValues.op){
                setOp(selectedValues.op);
                cyclesOperation.current.setValue(operationOptions.filter(elt => elt.value === selectedValues.op));
            }
    
            if(selectedValues.val){
                setCycles(selectedValues.val);
                inputRef.current.setValue(cyclesOptions.filter(elt => elt.value === selectedValues.val));
            }
        }
        
    }, [selectedValues]);

    return(
        <InputGroupWrapper>
            <InputWrapper>
                <label htmlFor="cycles-op">Operation</label>
                <Select label="cycles-op" id="cycles-op" ref={cyclesOperation} options={operationOptions} onChange={handleOpChange} isDisabled={isDisabled} isClearable={isClearable}/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor={`simple-input-cycles`}>Cycles</label>
                <Select id={`simple-input-cycles`} name={`simple-input-cycles`} ref={inputRef} options={cyclesOptions} onChange={handleCycleChange} isDisabled={isDisabled} isClearable={isClearable}/>
            </InputWrapper>
        </InputGroupWrapper>
    )
}

export default CyclesFilterOption;