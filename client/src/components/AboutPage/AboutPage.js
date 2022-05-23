import React from "react";
import styled from "styled-components";
import gbdbLogo from '../../assets/gbdb_logo_v2_flat_bg.gif';
import { Bezel, BezelTitle, LineContainer, BlueHR, PinkHR } from "../opcodeGrid/GridContainer";

const AboutPage = () => {
    return(
    <Wrapper>
        <Bezel style={{width: '75%'}}>
            <LineContainer>
                <PinkHR/>
                <BlueHR/>
                <BezelTitle>DOT MATRIX WITH STEREO SOUND</BezelTitle>
            </LineContainer>
            <img src={gbdbLogo} alt="loading..."/>
        </Bezel>
        
        <TextContainer>
            <section>
                GBDB is an interactive search tool for opcodes used by the Nintendo Game Boy's Sharp LR35902 CPU. The primary audience for this tool is anyone interested in learning more about how the Game Boy works under the hood. 
            </section>

            <section>
                <h1>Useful Resources</h1>
                <ul>
                    <li>
                        <a href="https://gbdev.io/pandocs/">Pandocs</a> | In its own words: "this document, started in early 1995 is considered the single most comprehensive technical reference to the Game Boy available to the public".
                    </li>
                    <li>
                        <a href="https://rgbds.gbdev.io/">RGBDS</a> | The Rednex Game Boy Development System, an assembly toolchain for writing ROMS for the Nintendo Game Boy.
                    </li>
                    <li>
                        <a href="https://gbdk-2020.github.io/gbdk-2020/docs/api/docs_getting_started.html">GBDK</a> | For those who like being a bit further away from assembly (everyone?) GBDK is a C compiler targeting the Game Boy hardware.
                    </li>
                    <li>
                        <a href="https://gbdev.gg8.se/wiki/articles/Gameboy_Bootstrap_ROM">The Bootstrap Rom</a> | Documenting how the bootstram program, the main form of copy protection on the Game Boy was reverse engineered using acid etching and a microscope.
                    </li>
                    <li> <a href="http://www.devrs.com/gb/">devrs</a>  | A very extensive set of documnetation, projects, and programs related to Game Boy development.</li>
                </ul>
            </section>

            <section>
                <h1>Contact</h1>
                Bugs or Feature requests can be reported <a href="https://github.com/csimpson1/GBDB/issues">on github</a>
            </section>

            
        </TextContainer>

    </Wrapper>)
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    margin: auto;

`;

const TextContainer = styled.div`
    width: 75%;
`;

export default AboutPage;