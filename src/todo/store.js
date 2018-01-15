/*
 * Copyright (c) 2018. Inspireso and/or its affiliates.
 */

import {action, autorun, computed, observable} from '../packages';

class ObservableTodoStore {
  @observable todos = [];
  @observable pendingRequests = 0;

  constructor() {
    autorun(() => console.log(this.report));
  }

  @computed
  get completedTodos() {
    return this.todos.filter(
      todo => todo.completed !== true
    );
  }

  @computed
  get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  @computed
  get report() {
    if (this.todos.length === 0)
      return "<none>";
    return `Next todo: "${this.todos[0].task}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  @action
  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }

  @action
  update(task) {
    this.todos[0] = {
      task: task,
      completed: false,
      assignee: null
    };
    this.todos[1] = {
      task: task,
      completed: false,
      assignee: null
    };
  }
}


const observableTodoStore = new ObservableTodoStore();

export default observableTodoStore;
