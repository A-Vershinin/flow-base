// @flow
import React, { Component } from "react";
import "./styles.css";

type AppState = {|
  todos: Array<any>
|};

const flipCompleted: (item: any) => * = item => ({
  ...item,
  completed: !item.completed
});

class ListOfBrands extends Component<any, AppState> {
  state = {
    todos: []
  };

  addTodo = (todo: any): void =>
    this.setState(state => ({
      todos: state.todos.concat(todo)
    }));

  removeTodo = (todoID: number): void =>
    this.setState(state => ({
      todos: state.todos.filter((todo: any): boolean => todo.id !== todoID)
    }));

  render() {
    const { todos } = this.state;
    const { items, onMixBrands } = this.props;

    return (
      <div className="list">
        <ol>
          {items.length &&
            items.map(item => <li key={item.id}>{item.name}</li>)}
        </ol>
        <button onClick={onMixBrands}>Mix brands</button>
        <hr />
        <span className="status-text">
          Total todos in state: {todos.length}
        </span>
        <br />
      </div>
    );
  }
}

export default ListOfBrands;
