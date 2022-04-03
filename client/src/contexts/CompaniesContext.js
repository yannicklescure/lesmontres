import { createContext, useEffect, useReducer } from "react";
import usePersistedState from "../hooks/usePersistedState";

export const CompaniesContext = createContext(null);

const initialState = {
  status: "idle",
  hasLoaded: false,
  companies: [],
  message: null,
  type: "initial",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "initial": {
      return {
        ...state,
      };
    }
    case "loading-companies-from-server": {
      return {
        ...state,
        status: "loading-companies-feed",
      };
    }
    case "received-companies-from-server": {
      return {
        ...state,
        ...action,
        hasLoaded: true,
        status: "companies-loaded",
      };
    }
    case "received-search-companies-from-server": {
      return {
        ...state,
        ...action,
        hasLoaded: true,
        status: "companies-loaded",
      };
    }
    case "received-companies-from-storage": {
      return {
        ...state,
        ...action,
        hasLoaded: true,
        status: "companies-loaded",
      };
    }
    case "error-from-server": {
      return {
        ...state,
        status: "error-from-server",
      };
    }
    default: {
      throw new Error(`Unrecognized action: ${action.type}`);
    }
  }
};

export const CompaniesProvider = ({ children }) => {
  const [localStorage, setLocalStorage] = usePersistedState('companies', {});
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(localStorage);
    console.log(localStorage?.length > 0);
    console.log(Object.keys(localStorage).length > 0);
    if(Object.keys(localStorage).length > 0) {
      dispatch({
        hasLoaded: true,
        companies: localStorage,
        message: 'data loaded from storage',
        type: "received-companies-from-storage",
      })
    }
  // eslint-disable-next-line
  }, []);

  const loadingCompanies = () => {
    dispatch({
      type: "loading-companies-from-server",
    });
  };

  const receivedCompaniesFromServer = (data) => {
    console.log(data);
    setLocalStorage({...localStorage, ...data});
    dispatch({
      ...data,
      type: "received-companies-from-server",
    });
  };

  const errorFromServer = () => {
    dispatch({
      type: "error-from-server",
    });
  };

  return (
    <CompaniesContext.Provider
      value={{
        state,
        actions: {
          loadingCompanies,
          receivedCompaniesFromServer,
          errorFromServer,
        },
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
};
