import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, CLEAR_TODOS } from "./actions";
import { tassign } from "tassign";

export interface IAppState {
  todos: ITodo[];
  lastUpdate: Date;
}

export interface ITodo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export const INITIAL_STATE: IAppState = {
  todos: [],
  lastUpdate: null
}

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case ADD_TODO:
      let newTodo = {
        id: state.todos.length + 1,
        title: action.title,
        isCompleted: false
      }
      return tassign(state, {
        todos: state.todos.concat(newTodo),
        lastUpdate: new Date()
      });
    case TOGGLE_TODO:
      let currentTodo = state.todos.find(t => t.id === action.todo.id);
      let index       = state.todos.indexOf(currentTodo);
      return tassign(state, {
        todos: [
          ...state.todos.slice(0, index),
          tassign(currentTodo, { isCompleted: !currentTodo.isCompleted }),
          ...state.todos.slice(index + 1)
        ]
      });
    case REMOVE_TODO:
      return tassign(state, {
        todos: state.todos.filter(t => t.id !== action.id),
        lastUpdate: new Date()
      })
    case CLEAR_TODOS:
      return tassign(state, {
        todos: [],
        lastUpdate: new Date()
      })
  }
  return state;
}
