import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./components/globalstyles/GlobalStyles"
import { OpcodesProvider } from "./contexts/opcodes/OpcodesContext";
import {FilterProvider} from "./contexts/filter-v2-context/FilterContext";
import { ViewsProvider } from "./contexts/saved-views/ViewContext";
import { GridContainer } from "./components/opcodeGrid/GridContainer";
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
