import styled from "styled-components";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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
import { UserContext } from "../contexts/UserContext";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";

function App() {
  const {
    state: { hasLoaded },
    actions: { loadingItems, receivedItemsFromServer, errorFromServer },
  } = useContext(ItemsContext);

  const {
    state: { user },
  } = useContext(UserContext);

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
            <Route exact path="/signup">
              {user._id ? <Redirect to="/" /> : <SignUp />}
            </Route>
            <Route exact path="/login">
              {user._id ? <Redirect to="/" /> : <Login />}
            </Route>
            <Route exact path="/products">
              <Redirect to="/products/fitness" />
            </Route>
            <Route exact path="/products/:category?">
              <Products />
            </Route>
            <Route exact path="/product/:_id">
              <ProductDetails />
            </Route>
            <Route exact path="/cart">
              <Cart />
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
  min-height: calc(100vh - 150px);
`;

export default App;
