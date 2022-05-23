import React, {createContext, useReducer} from "react";
export const OpcodesContext = createContext();

const initialState = {
    opcodes: [],
    unprefixed: [],
    prefixed: [],
    status: 'waiting'
};

const reducer = (state, action) => {
    switch(action.type) {
        case 'loading-data':{
            return {
                ...state, 
                status:'waiting'
            };
        }

        case 'got-data': {
            
            const prefixed = action.data.filter(elt => (elt.hexCode.includes('0xCB') && elt.hexCode !== '0xCB'))
            const unprefixed = action.data.filter(elt => !(elt.hexCode.includes('0xCB') && elt.hexCode !== '0xCB'));
            return {
                ...state,
                status:'idle',
                opcodes: action.data,
                prefixed,
                unprefixed 
            }
        }

        case 'error': {
            return {
                ...state,
                status: 'error'
            }
        }
        
        default:{
            throw new Error(`Action ${action.type} is not recognized!`);
        }
    }
};

export const OpcodesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getOpcodes = async () => {
        try{
            dispatch({type:'loading-data'});
            const resp = await fetch('/opcodes');
            const parsedResp = await resp.json();
            if(parsedResp.status < 400){
                dispatch({type: 'got-data', data: parsedResp.data});
            }

            else{
                dispatch({type: 'error'});
            }
        }

        catch (err){

            dispatch({type:'error'});
        }
    };

    const getSpecificOpcodes = async (params) => {

        try {
            dispatch({type: 'loading-data'});
            const resp = await fetch('/opcodes',
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: params
            });
            const parsedResp = await resp.json();
            if(parsedResp.status < 400){
                dispatch({type: 'got-data', data: parsedResp.data});
            }

            else{
                dispatch({type: 'error'});
            }
        }

        catch(err){
            dispatch({type: 'error'})
        }
    }

    return (
        <OpcodesContext.Provider
            value={{
                ...state,
                actions: {
                    getOpcodes,
                    getSpecificOpcodes
                }
            }}
        >
        {children}
        </OpcodesContext.Provider>
    );
};

export default OpcodesContext;