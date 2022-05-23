import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./components/globalstyles/GlobalStyles"
import { OpcodesProvider } from "./contexts/opcodes/OpcodesContext";
// import { FilterContextProvider } from './contexts/filter-context/FilterContext';
import TestOpcodeCardSmall from "./components/opcodeCard/opcodeCardSmall/TestOpcodeCardSmall";
import OpcodeGrid from "./components/opcodeGrid/OpcodeGrid";
// import Filter from "./components/filter/Filter";
import FilterOption from "./components/filter_v2/FilterOption";
import {FilterProvider} from "./contexts/filter-v2-context/FilterContext";
import { ViewsProvider } from "./contexts/saved-views/ViewContext";
import FilterOptions from "./components/filter_v2/FilterOptions";
import { GridContainer } from "./components/opcodeGrid/GridContainer";
import {TestOpcodeLarge} from "./components/opcodeCard/opcodeCardLarge/TestOpcodeLarge"
import Loader from "./components/Loader/Loader";
import Header from "./components/header/Header";
import AboutPage from "./components/AboutPage/AboutPage";
function App() {
  return (
      <OpcodesProvider>
          <Router>
            <GlobalStyles />
            <FilterProvider>
              <ViewsProvider>
                <Header></Header>
                <Routes>
                <Route path="/" element={<GridContainer/>}/>
                <Route path="/about" element={<AboutPage/>}/>

              </Routes>
              </ViewsProvider>
            </FilterProvider>
          </Router>
      </OpcodesProvider>
  );
}

export default App;
