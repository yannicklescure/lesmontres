import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Products from "../pages/Products";
import ErrorPage from "../pages/ErrorPage";
import GlobalStyles from "./GlobalStyles";
import Navbar from "./Navbar"
import Footer from "./Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Navbar />
        <Wrapper>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route path="">
              <ErrorPage />
            </Route>
          </Switch>
        </Wrapper>
        <Footer />
      </BrowserRouter>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 100px);
`;

export default App;
