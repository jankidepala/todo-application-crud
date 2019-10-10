/**
 * TodoListWidget
 *
 * (c) Machinify 2018. All rights reserved.
 * @flow
 **/
"use strict";
import * as React from "react";
import TodoList from "../models/TodoList.js";
import Todo from "../models/Todo.js";
import TodoWidget from "./TodoWidget.react.js";
import { rejects } from "assert";

export type TodoListWidgetProps = {
  todoList: TodoList,
};

export default class TodoListWidget extends React.Component<TodoListWidgetProps, void> {
  static defaultProps: void;
  constructor(props: TodoListWidgetProps) {
    super(props);
    this.state = {
      message: ''
    }
    autobind(this, "_handleAddTodo");
  }

  componentDidMount() {
    this._updateView();
  }

  render(): React.Node {
    var styles = {
      color: 'red',
      margin: '10px 40px'
    };
    var btnStyle = {
      margin: '0  0 0 20px',
    }
    
    return (
      <React.Fragment>
        <h2>TODO LIST</h2>
        <input
          type="button"
          value="Add Todo"
          onClick={this._handleAddTodo} />
        <div className="error-message" style={styles}>Message: {this.state.message}</div>

        {this.props.todoList.list.length > 0
          ? (<ol>
            {this.props.todoList.list.map((todo, i) =>
              <li key={i}>
                <TodoWidget todo={todo} />
                <input
                  type="button"
                  value="Delete"
                  style={btnStyle}
                  onClick={() => this._deleteThisTask(todo)}
                />

                <input
                  type="button"
                  value="Update task"
                  style={btnStyle}
                  onClick={() => this._editThis(todo)}
                />
              </li>
            )}
          </ol>
          ) : 'Loading..'}
      </React.Fragment>
    );
  }

  _editThis(todo) {
    /** Alphanumeric logic not required as only alpha numeric are allowed
      const re = /[0-9a-zA-Z]+/g;
      [...todo._title].forEach(s => s )
     */
    this.props.todoList.editAndUpdateTodo(todo).then(p => {
      p.id
        ? this.setState({ message: `Task with id: ${p.id} updated successfully` })
        : this.setState({ message: p })
    });
    this._updateView();
  }

  _deleteThisTask(todo) {
    this.props.todoList.removeTodo(todo).then(p => {
      p.error || p.message
        ? this.setState({ message: p.reason || p.message })
        : this.setState({ message: `Task no: ${p.id} with title: ${p.title} deleted` })
    }
    );
    this._updateView();
  }

  _handleAddTodo(ev) {
    const todo = new Todo();
    todo.title = "New TODO";
    this.props.todoList.addTodo(todo);
    todo.save();
    this.forceUpdate();
  }

  _updateView() {
    this.props.todoList.load()
      .then(() => this.forceUpdate());
  }
}