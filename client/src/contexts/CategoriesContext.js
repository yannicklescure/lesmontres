import { createContext, useEffect, useReducer } from "react";
import usePersistedState from "../hooks/usePersistedState";

export const CategoriesContext = createContext(null);

const initialState = {
  status: 'idle',
  hasLoaded: false,  
  categories: [
    {
        "name": "fitness",
        "companies": [],
        "items": []
    },
    {
        "name": "medical",
        "companies": [],
        "items": []
    },
    {
        "name": "lifestyle",
        "companies": [],
        "items": []
    },
    {
        "name": "entertainment",
        "companies": [],
        "items": []
    },
    {
        "name": "industrial",
        "companies": [],
        "items": []
    },
    {
        "name": "pets and animals",
        "companies": [],
        "items": []
    },
    {
        "name": "gaming",
        "companies": [],
        "items": []
    }
  ],
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
    case "categories-updated": {
      return {
        ...state,
        ...action,
        status: "categories-updated",
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
  const [localStorage, setLocalStorage] = usePersistedState('categories', []);
  
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // console.log(localStorage);
    if(localStorage?.length > 0) {
      dispatch({
        hasLoaded: true,
        categories: localStorage,
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
    console.log('#########################');
    console.log('initialState');
    console.log('#########################');    
    console.log(data);
    const tmp = data.categories.map(category => ({
      name: category.toLowerCase(),
      companies: [],
      items: []
    }));
    setLocalStorage(tmp);
    data.categories = tmp;
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

  const updateCategories = (data) => {
    setLocalStorage(data.categories);
    // console.log(data);
    dispatch({
      ...data,
      type: "categories-updated",
    });
  };

  return (
    <CategoriesContext.Provider value={{
      localStorage,
      state,
      actions: {
        loadingCategories,
        receivedCategoriesFromServer,
        errorFromServerCategories,
        updateCategories,
      }
    }}>
      {children}
    </CategoriesContext.Provider>
  );
};