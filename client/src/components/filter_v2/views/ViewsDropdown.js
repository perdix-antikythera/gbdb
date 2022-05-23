import React from "react";
import styled from "styled-components";
import ViewSelector from "./ViewSelector";
import { Collapse } from 'react-collapse';
import {CgChevronRightO, CgChevronDownO} from 'react-icons/cg';
import Button from "../../Common/Button";


const ViewsDropdown = () => {


    const [isOpen, setIsOpen] = React.useState(false);

    const toggleOpen = (evt) => {
        evt.preventDefault();
        setIsOpen(!isOpen);
    }



    return(
        <DropdownContainer>
            <div>
                <Button onClick={toggleOpen}>{isOpen && <CgChevronDownO/>}{!isOpen && <CgChevronRightO/>}</Button>
            </div>
            <Container>
                {!isOpen && <Title> Saved Views</Title>}
                <Collapse isOpened={isOpen}>
                    <ViewSelector/>
                </Collapse>
            </Container>
        </DropdownContainer>

    );
};

const DropdownContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`

const Title = styled.div`
`

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    margin-left: 30px;
`;



export default ViewsDropdown