import React from 'react';
import styled from 'styled-components';
import FilterOption from './FilterOption';
import FilterContext from '../../contexts/filter-v2-context/FilterContext';
import { Button } from '../Common/Button';
export const NewRow = ({index}) => {
    const [rowPayload, setRowPayload] = React.useState({});
    const [validated, setValidated] = React.useState(false);

    const {
        actions:{
            addRow
        }
    } = React.useContext(FilterContext);

    const handleClick = (evt) => {
        evt.preventDefault();
        addRow(rowPayload);
    };


    return (
        <Container>
            <ButtonContainer>
                <Button onClick={handleClick}>+</Button>
            </ButtonContainer>
            <FilterOption index={index} isFirst={false} setRowPayload={setRowPayload} setValidated={setValidated}/>
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

export default NewRow;
