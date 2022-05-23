import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { MdGames } from 'react-icons/md';

const Header = () => {
    return(
    <Wrapper>
        <LineContainer>
            <VertLine/>
            <VertLine/>
        </LineContainer>
        <Links>
            <MdGames size={50}/>
            <div>GBDB</div>
            <StyledLink to='/'>Opcodes Table</StyledLink>
            <StyledLink to='/about'>About </StyledLink>
        </Links>
        <LineContainer>
            <VertLine/>
            <VertLine/>
        </LineContainer>

    </Wrapper>
    );
}

const Wrapper = styled.header`
    display: flex;

    padding-left: 10px;
    border-bottom: 3px solid;
    border-color: slategrey;
    align-items: center;
    justify-content: space-around;
    
`;

const Links = styled.div`
    display: flex;
    padding: 10px;
    align-items: center;
    gap: 15px;
`;

const StyledLink = styled(NavLink)`
    text-decoration: underline;
    color: black;
    
`;

const LineContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const VertLine = styled.div`
    border-left: 3px solid slategrey;
    width: 15px;
    height: 100px;

`

export default Header