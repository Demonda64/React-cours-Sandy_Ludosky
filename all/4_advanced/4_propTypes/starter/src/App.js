import { useRef, useContext } from "react";
import DataProvider from "./DataProvider";
import logo from "./logo.svg";
import "./App.css";

// Form
function Form({ connected, inputValue, addItem, handleOnChange }) {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) {
      return false;
    }
    addItem();
    handleOnChange(null);
    inputRef.current.value = null;
  };
  const inputRef = useRef();
  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        onChange={(e) => handleOnChange(e.target.value)}
        ref={inputRef}
        disabled={!connected}
      />
    </form>
  );
}

// Todo List
function Todos({ items, removeItem }) {
  return (
    <ul>
      {[].map((item) => (
        <li key={item.id} onClick={() => removeItem(item.id)}>
          {item.value}
        </li>
      ))}
    </ul>
  );
}

// Home
function App() {
  return (
    <div className="App">
      <DataProvider
        render={({ state, ...props }) => {
          return (
            <>
              {" "}
              <button onClick={props.authenticate}>
                {state.connected ? "Logout" : "Login"}
              </button>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {!!state.items.length && `${state.items.length} todos`}
                <Form {...props} {...state} />
                {state.connected && <Todos {...props} {...state} />}
              </header>
            </>
          );
        }}
      />
    </div>
  );
}

export default App;
