import React from "react";

class DataProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: this.props.items, value: null };
  }

  handleOnChange = (e) =>
    this.setState({ ...this.state, value: e.target.value });
  handleOnSubmit = (e) => {
    e.preventDefault();
    if (!this.state.value) {
      return false;
    }
    const newTodo = {
      id: `${new Date().getTime()}`,
      text: this.state.value,
      completed: false,
    };
    this.setState({ ...this.state, todos: [...this.state.todos, newTodo] });
  };

  render() {
    return (
      <div className="App">
        <h1 style={{ textAlign: "center" }}>Ma Todo List</h1>
        <header className="App-header">
          {" "}
          <br />
          {this.props.render({
            data: this.state,
            handleOnChange: this.handleOnChange,
            handleOnSubmit: this.handleOnSubmit,
          })}
        </header>
      </div>
    );
  }
}
export default DataProvider;
