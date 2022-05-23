import React from "react";
import styled from "styled-components";
import { Collapse } from 'react-collapse';
import {CgChevronRightO, CgChevronDownO} from 'react-icons/cg';
import {Button} from "../Common/Button";

const DropdownSection = ({children, title}) => {


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
                {!isOpen && <Title>{title}</Title>}
                <Collapse isOpened={isOpen}>
                    {children}
                </Collapse>
            </Container>
        </DropdownContainer>

    );
};

const DropdownContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin: 5px;
`

const Title = styled.div`
`

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    margin-left: 30px;
`;



export default DropdownSection;