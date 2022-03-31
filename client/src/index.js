import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ItemsProvider } from './contexts/ItemsContext';
import { UserProvider } from './contexts/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
    <ItemsProvider>
      <App />
    </ItemsProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
