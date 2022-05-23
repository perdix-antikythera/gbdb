import React from "react";
import styled from "styled-components";
import FilterContext from "../../contexts/filter-v2-context/FilterContext";
import ViewsContext from "../../contexts/saved-views/ViewContext";
import NewRow from "./NewRow";
import ExistingRow from "./ExistingRow";
import { SelectButton } from '../Common/Button';

const FilterOptions = ({setValidated}) => {
    const {
        filterCriteria,
        actions:{
            addRow,
            removeRow,
            createPayload,
            makeOpcodeCall,
        }
    } = React.useContext(FilterContext);

    const {
        actions: {
            saveView
        }
    } = React.useContext(ViewsContext);

    const viewNameRef = React.useRef(null)

    const [isOpen, setIsOpen] = React.useState(false);
    const [viewOpen, setViewOpen] = React.useState(false);


    const handleSubmitFilter = (evt) => {
        evt.preventDefault();;
        makeOpcodeCall();
    }

    const handleOpenView = (evt) => {
        setViewOpen(true);
    }

    const handleClose = () => {
        setViewOpen(false);
    }

    const handleSaveView = () => {
        const name=viewNameRef.current.value;
        const view=filterCriteria;
        saveView(name, view);
        handleClose(); 
    }

    return(

            <Container >

                {filterCriteria.map((elt, idx) => <ExistingRow index={idx} data={elt} isFirst={false} setValidate={setValidated}/>)}
                <hline></hline>
                <NewRow index={filterCriteria.length} setValidated={setValidated}/>

                    <InputContainer>
                        { !viewOpen &&
                            <ButtonContainer>
                                <SelectButton width={100} onClick={handleSubmitFilter}>Set Filter</SelectButton>
                                <SelectButton  width={100} onClick={handleOpenView}>Save as View</SelectButton>
                            </ButtonContainer>
                            
                        }
                        { viewOpen &&
                            <div>
                                <label htmlFor='view-name'>View Name</label>
                                <input id='view-name' name='view-name' type='text' ref={viewNameRef}/>
                                <SelectButton onClick={handleSaveView}>Save View</SelectButton>
                                <SelectButton onClick={handleClose}>Cancel</SelectButton>
                            </div>
                            
                        }

                    </InputContainer>
            </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const ButtonContainer = styled.div`
padding-top: 10px;
    display: flex;
    gap: 5px;
`

const InputContainer = styled.div`
    align-self: flex-end;
`;

export default FilterOptions;