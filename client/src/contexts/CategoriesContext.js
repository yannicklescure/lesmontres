import { createContext, useEffect, useReducer } from "react";
import usePersistedState from "../hooks/usePersistedState";

export const CategoriesContext = createContext(null);

const initialState = {
  status: 'idle',
  hasLoaded: false,  
  categories: [],
  message: null,
  type: "initial",
};

const reducer = (state, action) => {
  switch(action.type) {
    case "initial": {
      return {
        ...state,
      };
    }
    case "loading-categories-from-server": {
      return {
        ...state,
        status: "loading-categories",
      }
    } 
    case "received-categories-from-server": {
      return {
        ...state,
        ...action,
        loggedIn: true,
        hasLoaded: true,
        status: "categories-loaded",
      }
    }
    case "received-categories-from-storage": {
      return {
        ...state,
        ...action,
        status: "categories-loaded",
      }
    }
    case "error-from-server": {
      return {
        ...state,
        ...action,
        status: "error-from-server",
      };
    }
    default: {
      throw new Error(`Unrecognized action: ${action.type}`);
    }
  }
};

export const CategoriesProvider = ({ children }) => {
  const [localStorage, setLocalStorage] = usePersistedState('categories', {});
  
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // console.log(localStorage);
    // console.log(localStorage?.user?._id);
    if(localStorage?.user?._id) {
      dispatch({
        hasLoaded: true,
        categories: localStorage.categories,
        message: 'data loaded from storage',
        type: "received-categories-from-storage",
      })
    }
  // eslint-disable-next-line
  }, []);

  const loadingCategories = () => {
    dispatch({
      type: "loading-categories-from-server",
    });
  };

  const receivedCategoriesFromServer = (data) => {
    console.log(data);
    const tmp = data.categories.map(category => ({
      category,
      companies: []
    }));
    setLocalStorage(tmp);
    dispatch({
      ...data,
      type: "received-categories-from-server",
    });
  };

  const errorFromServerCategories = (data) => {
    dispatch({
      ...data,
      type: "error-from-server",
    });
  };

  return (
    <CategoriesContext.Provider value={{
      state,
      actions: {
        loadingCategories,
        receivedCategoriesFromServer,
        errorFromServerCategories,
      }
    }}>
      {children}
    </CategoriesContext.Provider>
  );
};