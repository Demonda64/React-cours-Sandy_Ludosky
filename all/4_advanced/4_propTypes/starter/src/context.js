import {
  useState,
  useReducer,
  createContext,
  useMemo,
  useCallback,
} from "react";

// reducer = state management
const initialState = {
  items: [],
  connected: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: new Date().getTime(),
            value: action.payload,
            completed: false,
            category: state.category,
          },
        ],
      };
    case "remove":
      const remove = (item) => item.id !== action.payload;
      return { ...state, items: state.items.filter(remove) };
    case "auth":
      return { ...state, connected: action.payload };
    default:
      return state;
  }
}

export const Context = createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState(null);

  const handleOnChange = (value) => setInputValue(value);
  const removeItem = (id) => dispatch({ type: "remove", payload: id });
  const addItem = useCallback(
    () => dispatch({ type: "add", payload: inputValue }),
    [inputValue]
  );
  const authenticate = useCallback(
    () => dispatch({ type: "auth", payload: !state.connected }),
    [state.connected]
  );
  const value = useMemo(() => {
    return {
      state,
      inputValue,
      authenticate,
      handleOnChange,
      removeItem,
      addItem,
    };
  }, [state, inputValue, addItem, authenticate]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
