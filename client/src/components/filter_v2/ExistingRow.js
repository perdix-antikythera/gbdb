import React from 'react';
import styled from 'styled-components';
import FilterOption from './FilterOption';
import FilterContext from '../../contexts/filter-v2-context/FilterContext';
import {Button, SelectButton} from '../Common/Button';

export const ExistingRow = ({index, data}) => {
    const [rowPayload, setRowPayload] = React.useState({});
    const [validated, setValidated] = React.useState(false);

    const {
            actions:{ 
            removeRow,
            addRow,
        }
    } = React.useContext(FilterContext);

    const handleClick = (evt) => {
        evt.preventDefault();
        // ugly fix, some components are not sending rowPayload properly
        if(!('rowNum' in rowPayload)){
            rowPayload.rowNum = index;
        }
        removeRow(rowPayload);
    };

    // React.useEffect(() => {
    //     setValidated(true);
    // }, []);

    React.useEffect(() => {
        if(rowPayload.filter && validated){
            addRow(rowPayload);
        }

        // else if(!validated){
        //     setValidated(true);
        // }
        
    }, [rowPayload]);

    // The isInactive here is a gross hack for now. This skirts around the problems being had with the existing rows being edited
    // by disabling editing on these. 
    return (
        <Container>
            <ButtonContainer>
                <Button onClick={handleClick}>-</Button>
            </ButtonContainer>
            <FilterOption index={index} isFirst={false} data={data} setRowPayload={setRowPayload} setValidated={setValidated} isInactive={true}/>
        </Container>
    )


};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export default ExistingRow;