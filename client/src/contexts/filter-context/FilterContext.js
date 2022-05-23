import React, {createContext, useReducer} from "react";
import clone from 'just-clone';
import OpcodesContext from "../opcodes/OpcodesContext";
// This context acts as a go-between for the filter components and the opcode service
// On submit, each component sends its data here to be parsed. This component then fires
// a message to change the loaded operations

export const FilterContext = createContext();

// Things that we will allow the user to filter by
// Categories as displayed on the ui -> colored multiselect
// mnemonic, bytes, immediate, hexCode 
// prefixed vs non prefixed
// cycles -> has a comparator and a value which is a number
// flags -> expands to show each flag and their options
// Operands -> name, bytes, immediate, index
// Also have the ability to add a second set of inputs for a second operand if needed

const initialState = {
    mnemonic: null,
    bytes: null,
    immediate: null,
    hexCode: null,
    category: null,
    cycles: null,
    cyclesOperation: null,
    flags: null,
    operands: null,
};

const validKeys = Object.keys(initialState);

const reducer = (state, action) => {
    switch(action.type) {
        case 'update-filters':{
            // action.data will be a list of key-value pairs
            // we update each piece of information the user has provided
            const toUpdate = Object.keys(action.data);
            const newState = clone(state);
            toUpdate.forEach(key => {
                if(validKeys.includes(key)){
                    const value = action.data[key];
                    // We need to filter out empty values since the service
                    // will search for whatever we pass it, even an empty value
                    // which would return nothing.
                    if(
                        (typeof(value) === 'object' && Object.keys(value).length === 0) || 
                        (Array.isArray(value) && value.length === 0)
                    ){
                        newState[key] = null;
                    }

                    // Cases for cycles compound operation
                    else if(key === 'cycles'){
                        newState['cycles'] = {...newState['cycles'], val: value};
                    }

                    else if(key === 'cyclesOperation'){
                        newState['cycles'] = {...newState['cycles'], op: value};
                    }

                    else{
                        newState[key] = action.data[key];
                    }
                    
                }
            });
            return {...state, ...newState};
        }

        default: {
            throw new Error(`Action ${action.type} is not supported`);
        }
    }
};

export const FilterContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const updateFilters = (data) => {
        // Wrapper function for updating filter data

        dispatch({type:'update-filters', data});
    }

    const createPayload = () => {
        // Form a payload with all the non-null fields stored
        const payload = {};
        validKeys.forEach(key => {
            const filterVal = state[key];
            if(filterVal){
                payload[key] = filterVal;
            }
        });

        return JSON.stringify(payload);
    };

    return(
        <FilterContext.Provider
            value={{
                ...state,
                actions:{
                    updateFilters,
                    createPayload
                }
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export default FilterContext