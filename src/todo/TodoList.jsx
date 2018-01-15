/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */
import React from 'react';
import {observer} from "mobx-react";
import store from './store';

@observer
export default class TodoList extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {store.completedTodos.map(
            (todo, idx) => <TodoView todo={todo} key={idx}/>
          )}
        </ul>
        {/*{store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null}*/}
        <button onClick={this.onNewTodo}>New Todo</button>
        <button onClick={this.onUpdateTodo}>Update Todo</button>
        <small> (double-click a todo to edit)</small>
      </div>
    );
  }

  onNewTodo = () => {
    store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
  };

  onUpdateTodo = () => {
    store.update(prompt('Enter a new todo:', 'coffee plz'));
  };
}

@observer
class TodoView extends React.Component {
  render() {
    const {todo} = this.props;
    return (
      <li onDoubleClick={this.onRename}>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={this.onToggleCompleted}
        />
        {todo.task}
        {todo.assignee
          ? <small>{todo.assignee.name}</small>
          : null
        }
      </li>
    );
  };

  onToggleCompleted = () => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  };

  onRename = () => {
    const todo = this.props.todo;
    todo.task = prompt('Task name', todo.task) || todo.task;
  };
}
