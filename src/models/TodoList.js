/**
 * TodoList
 *
 * (c) Machinify 2018. All rights reserved.
 * @flow
 **/

import Todo from "./Todo.js";
import TodoAPI from "../TodoAPI.js";

export default class TodoList {
  _list: Array<Todo>;

  constructor() {
    this._list = [];
  }

  get list(): Array<Todo> {
    return this._list;
  }

  load(): Promise<any> {
    return TodoAPI.getList()
      .then((list) => {
        this._list = list.map((data) => Todo.fromJSON(data));
      });
  }

  // Add a Todo to the end of the list
  addTodo(todo: Todo) {
    this._list.push(todo);
  }

  // Remove the Todo at the specified position
  removeTodo(todo): Promise<> {
    return TodoAPI.deleteTodo(todo)
      .then(success => success)
      .catch(err => err)
  }

  // Remove the Todo at the specified position
  editAndUpdateTodo(todo): Promise<> {
    return TodoAPI.updateTodo(todo)
      .then(e => e)
      .catch(err => err)
  }

}