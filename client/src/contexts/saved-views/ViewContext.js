import React, {createContext, useReducer} from 'react';
import clone from 'just-clone';
import FilterContext from '../filter-v2-context/FilterContext';

export const ViewsContext = createContext(null);

const initialState = {
    views: [],
    status: 'waiting',
    reqStatus: 'waiting'
};

const reducer = (state, action) => {
    switch(action.type){
        case 'loading-data': {
            return {
                ...state,
                status: 'waiting'
            }
        }

        case 'got-data': {
            return {
                ...state,
                views: action.data,
                status: 'idle'
            }
        }

        case 'got-error':{
            return {
                ...state,
                status: 'error'
            }
        }

        case 'sending-req':{
            return {
                ...state,
                reqStatus: 'waiting'
            }
        }

        case 'req-complete':{
            return {
                ...state,
                reqStatus: 'idle'
            }
        }

        case 'req-error':{
            return {
                ...state,
                reqStatus: 'error'
            }
        }

        default:{
            throw new Error(`Action ${action.type} is not recognized!`);
        }
    
    }
};

export const ViewsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getViews = async () => {
        try{
            dispatch({type: 'loading-data'});
            const resp = await fetch('/views');
            const parsedResp = await resp.json();
            if(parsedResp.status < 400) {
                dispatch({type:'got-data', data:parsedResp.data});
            }

            else{
                dispatch({type:'got-error'});
            }
        }

        catch(err){
            dispatch({type: 'got-error'})
        }
    };

    const saveView = async(name, view) => {
        try{
            const payload = JSON.stringify({name, view});
            dispatch({type:'sending-req'});
            const resp = await fetch('/views', 
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: payload
            });
            const parsedResp = await resp.json();
            if(parsedResp.status < 400) {
                dispatch({type:'req-complete'});
                getViews();
            }

            else{
                dispatch({type:'req-error'});
            }
        }

        catch(err){
            dispatch({type: 'req-error'});
        }
    };

    const deleteView = async (_id) => {
        try{
            const payload = JSON.stringify({_id});
            const resp = await fetch('/views',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'DELETE',
                body: payload
            });

            const parsedResp = await resp.json();

            if(parsedResp.status < 400) {
                dispatch({type:'req-complete'});
            }

            else{
                dispatch({type:'req-error'});
            }
        }

        catch(err){
            dispatch({type: 'req-error'});
        }
    };

    return(
        <ViewsContext.Provider
        value={{
            ...state,
            actions:{
                getViews,
                saveView,
                deleteView
            }
        }}>
            {children }
        </ViewsContext.Provider>

    )


}

export default ViewsContext;
