import { Component } from '@angular/core';
import { TodoService } from '../todo.service';

import { NgRedux, select } from 'ng2-redux';
import { IAppState } from "../store";
import { ADD_TODO, TOGGLE_TODO } from "../actions";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  // Read the comment in TodoService
  constructor(
    private service: TodoService,
    private ngRedux: NgRedux<IAppState>) {
  }

  reduxAddTodo(input) {
    if (!input.value) return;

    this.ngRedux.dispatch({
      type: ADD_TODO,
      newTodo: input.value
    });

    input.value = '';
  }

  reduxToggleTodo(todo) {
    this.ngRedux.dispatch({
      type: TOGGLE_TODO,
      todo: todo
    })
  }

  addTodo(input) {
    if (!input.value) return;

    this.service.addTodo(input.value);

    input.value = '';
  }

  toggleTodo(todo) {
    this.service.toggleTodo(todo);
  }

  removeTodo(todo) {
    this.service.removeTodo(todo);
  }
}
