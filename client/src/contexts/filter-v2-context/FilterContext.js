import React, {createContext, useContext, useReducer} from "react";
import clone from 'just-clone';
import OpcodesContext from "../opcodes/OpcodesContext";

export const FilterContext = createContext(null);

const initialState = {
    filterCriteria: []
}

const reducer = (state, action) => {
    const data = action.data;
    let newState = clone(state)
    switch (action.type){
        case 'add-row':{
            // we want to add a row, either to a specific index or to a
            // action = {type: string, rowNum: int, filter: {...} }
            if(typeof data.rowNum === 'number'  &&  0 <= data.rowNum && data.rowNum < newState.filterCriteria.length){
                newState.filterCriteria.splice(data.rowNum, 1, data.filter);

                return newState;
            }

            else if((typeof data.rowNum === 'number' &&  0 <= data.rowNum && data.rowNum === newState.filterCriteria.length) || !data.rowNum){
                newState.filterCriteria.push(data.filter);
                return newState
            }

            else{
                return state;
            }


        }

        case 'delete-row':{
            // we want to delete a row at a specific index
            if(typeof data.rowNum === 'number' &&  0 <= data.rowNum && data.rowNum < newState.filterCriteria.length){
                newState.filterCriteria = newState.filterCriteria.filter((elt, idx) => idx !== data.rowNum);
                return newState;
            }

            else{
                return state
            }
        }

        case 'set-view':{
            return {
                ...state,
                filterCriteria: action.data
            }
        }
    }
};

export const FilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        actions:{
            getSpecificOpcodes
        }
    } = useContext(OpcodesContext);

    const addRow = (data) => {
        dispatch({type: 'add-row', data})
    }

    const removeRow = (data) => {
        dispatch({type :'delete-row', data});
    }

    const createPayload = (array=null) => {
        // Create a payload to be sent to the opcodes service
        // If a user enters multiple rows that will affect the same criteria
        // ie they enter two distinct rows for hexcode, the latter value will be what is passed
        let payload = {};
        if(array === null){
            array = state.filterCriteria;
        }

        array.forEach(criteria => {
            // criteria has the form  {currentSearchField, data}
            Object.keys(criteria).forEach(key => {
                //payload[criteria.currentSearchField] = criteria.data;
                if(key === 'operand'){
                    // operand expects an array, so we coalesse all instances here
                    payload[key]? (payload[key].append(criteria[key])):(payload[key] = [criteria[key]]);
                }
                else{
                    payload[key] = criteria[key];
                }
                
            })
            
        })

        return JSON.stringify(payload);
    };

    const makeOpcodeCall = () => {
        const payload = createPayload();
        getSpecificOpcodes(payload);
    };


    const setView = async (view) => {
        dispatch({type:'set-view', data: view});
        //makeOpcodeCall();
    }

    return(
        <FilterContext.Provider
            value={{
                ...state,
                actions:{
                    addRow,
                    removeRow,
                    createPayload,
                    makeOpcodeCall,
                    setView
                }
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}

export default FilterContext;