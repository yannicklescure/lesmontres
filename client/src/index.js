import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { CategoriesProvider } from './contexts/CategoriesContext';
import { CompaniesProvider } from './contexts/CompaniesContext';
import { ItemsProvider } from './contexts/ItemsContext';
import { UserProvider } from './contexts/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <CompaniesProvider>
    <UserProvider>
    <ItemsProvider>
    <CategoriesProvider>
      <App />
    </CategoriesProvider>
    </ItemsProvider>
    </UserProvider>
    </CompaniesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
