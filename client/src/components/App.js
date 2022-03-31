import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Products from "../pages/Products";
import ErrorPage from "../pages/ErrorPage";
import GlobalStyles from "./GlobalStyles";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignUp from "../pages/SignUp";
import { ItemsContext } from "../contexts/ItemsContext";
import { useContext, useEffect } from "react";
import Loading from "./Loading";
import Login from "../pages/Login";

function App() {
  const {
    state: { hasLoaded },
    actions: { loadingItems, receivedItemsFromServer, errorFromServer },
  } = useContext(ItemsContext);

  useEffect(() => {
    loadingItems();
    fetch(`/api/items`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        receivedItemsFromServer({ items: response.data });
      })
      .catch((err) => errorFromServer());
    // eslint-disable-next-line
  }, []);

  if (!hasLoaded) {
    return <Loading size="32" />;
  }

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

            <Route exact path="/sign-up">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/products/:category?">
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
  background-color: black;
`;

export default App;
