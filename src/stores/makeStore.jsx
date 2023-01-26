import React, { createContext, useContext, useReducer } from 'react';

export default function MakeStore(reducer, initialState, displayName = '') {
  const storeContext = createContext();
  const dispatchContext = createContext();
  storeContext.displayName = displayName;

  const StoreProvider = (props) => {
    const [store, dispatch] = useReducer(reducer, initialState);

    return (
      <dispatchContext.Provider value={dispatch}>
        <storeContext.Provider value={store}>{props.children}</storeContext.Provider>
      </dispatchContext.Provider>
    );
  };

  const useStore = () => useContext(storeContext);
  const useDispatch = () => useContext(dispatchContext);

  return [StoreProvider, useDispatch, useStore];
}
