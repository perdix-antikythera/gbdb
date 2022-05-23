import React from 'react';
import Select from 'react-select'
import FilterContext from '../../../contexts/filter-v2-context/FilterContext';
import clone from 'just-clone';

import {
    flagOptions
} from '../FilterConstants';

import {
    InputWrapper,
    InputGroupWrapper
} from '../FilterStyles';

export const FlagsFilterOption = ({index, selectedValues, setRowPayload, setValidated, isInactive}) => {

    const isDisabled = isInactive;
    const isClearable = !isInactive;

    const zFlag = React.useRef(null);
    const nFlag = React.useRef(null);
    const hFlag = React.useRef(null);
    const cFlag = React.useRef(null);

    const [z, setZ] = React.useState(null);
    const [n, setN] = React.useState(null);
    const [h, setH] = React.useState(null);
    const [c, setC] = React.useState(null);

    const {
        filterCriteria,
        actions: {
            addRow,
            deleteRow
        }
    } = React.useContext(FilterContext);

    const handleChange = (evt, fn) => {
        fn(evt.value);
    };

    const handleZChange = (evt) => handleChange(evt, setZ);
    const handleNChange = (evt) => handleChange(evt, setN); 
    const handleHChange = (evt) => handleChange(evt, setH); 
    const handleCChange = (evt) => handleChange(evt, setC);  


    React.useEffect(() => {
        if(z || n || h || z){
            let payload = {};
            if(z) payload['Z'] = z;
            if(n) payload['N'] = n;
            if(h) payload['H'] = h;
            if(c) payload['C'] = c;

            setRowPayload({rowNum: index, filter: {flags: payload}});
        }
    }, [z, n, h, z]);

    React.useEffect(() => {
        if(selectedValues && Object.keys(selectedValues).length > 0){
            if(selectedValues.Z) {
                setZ(selectedValues.Z);
                zFlag.current.setValue(flagOptions.filter(elt => elt.value === selectedValues.Z));
            }
            if(selectedValues.N){
                setN(selectedValues.N);
                nFlag.current.setValue(flagOptions.filter(elt => elt.value === selectedValues.N));
            } 
            if(selectedValues.H){
                setH(selectedValues.H);
                hFlag.current.setValue(flagOptions.filter(elt => elt.value === selectedValues.H));
            } 
            if(selectedValues.C){
                setC(selectedValues.C);
                cFlag.current.setValue(flagOptions.filter(elt => elt.value === selectedValues.C));
            }
            setValidated(true);
        }

        else{
            setValidated(false);
        }
    }, [selectedValues]);



    return (
        <InputGroupWrapper>
            <InputWrapper>
                <label htmlFor='zflag'>Z</label>
                <Select id='zflag' name='zflag' ref={zFlag} options={flagOptions.filter(elt => (elt.value === 'Z' || ['0','1', '-'].includes(elt.value)))} onChange={handleZChange} isDisabled={isDisabled} isClearable={isClearable}/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor='nflag'>N</label>
                <Select id='nflag' name='nflag' ref={nFlag} options={flagOptions.filter(elt => (elt.value === 'N' || ['0','1', '-'].includes(elt.value)))} onChange={handleNChange} isDisabled={isDisabled} isClearable={isClearable}/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor='hflag'>H</label>
                <Select id='hflag' name='hflag' ref={hFlag} options={flagOptions.filter(elt => (elt.value === 'H' || ['0','1', '-'].includes(elt.value)))} onChange={handleHChange} isDisabled={isDisabled} isClearable={isClearable}/>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor='cflag'>C</label>
                <Select id='cflag' name='cflag' ref={cFlag} options={flagOptions.filter(elt => (elt.value === 'C' || ['0','1', '-'].includes(elt.value)))} onChange={handleCChange} isDisabled={isDisabled} isClearable={isClearable}/>
            </InputWrapper>
        </InputGroupWrapper>
    )
}

export default FlagsFilterOption