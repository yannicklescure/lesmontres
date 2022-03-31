import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Products from "../pages/Products";
import ErrorPage from "../pages/ErrorPage";
import GlobalStyles from "./GlobalStyles";
import Navbar from "./Navbar"
import Footer from "./Footer";
import { ItemsContext } from "../contexts/ItemsContext";
import { useContext, useEffect } from "react";

function App() {

  const {
    actions: {
      loadingItems,
      receivedItemsFromServer,
      errorFromServer,
    }
  } = useContext(ItemsContext);

  useEffect(() => {
    loadingItems();
    fetch(`/api/items`)
      .then(res => res.json())
      .then((response) => {
        console.log(response);
        receivedItemsFromServer({items: response.data});
      })
      .catch(err => errorFromServer());
  // eslint-disable-next-line
  }, []);

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
`;

export default App;
