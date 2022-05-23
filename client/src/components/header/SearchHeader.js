import React from 'react';
import styled from 'styled-components';
import DropdownSection from '../DropdownSection/DropdownSection';
import ViewSelector from '../filter/views/ViewSelector';
import FilterOptions from '../filter/FilterOptions';

const SearchHeader = () => {

    return(
        <div>
            <DropdownSection title="Opcode Filters">
                <FilterOptions/>
            </DropdownSection>
            <DropdownSection title="Saved Views">
                <ViewSelector/>
            </DropdownSection>
        </div>
    )
};

export default SearchHeader