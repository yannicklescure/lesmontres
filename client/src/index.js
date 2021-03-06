import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { CategoriesProvider } from "./contexts/CategoriesContext";
import { ItemsProvider } from "./contexts/ItemsContext";
import { UserProvider } from "./contexts/UserContext";
import { CompaniesProvider } from "./contexts/CompaniesContext";
import { WishListProvider } from "./contexts/WishListContext";

// Hide all app console.logs
// if (process.env.NODE_ENV !== "development") console.log = () => {};
console.log = () => {};

ReactDOM.render(
  <React.StrictMode>
    <CompaniesProvider>
      <UserProvider>
        <ItemsProvider>
          <CategoriesProvider>
            <WishListProvider>
              <App />
            </WishListProvider>
          </CategoriesProvider>
        </ItemsProvider>
      </UserProvider>
    </CompaniesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
