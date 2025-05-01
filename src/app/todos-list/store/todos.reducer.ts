import { createReducer, on } from "@ngrx/store";
import { Todo } from "../todos-list.component";
import { TodosActions } from "./todos.actions";

const initiaLState: { todos: Todo[] } = {
    todos: [],
};

export const todoReducer = createReducer(
    initiaLState,
    on(TodosActions.loadSuccess, (state, payload) => ({
        ...state,
        todos: payload.todos,
    })),
    on(TodosActions.edit, (state, payload) => ({
        ...state,
        todos: state.todos.map((todo: Todo) => {
            return todo.id === payload.todo.id ? payload.todo : todo;
        }),
    })),
    on(TodosActions.create, (state, payload) => ({
        ...state,
        todos: [payload.todo, ...state.todos],
    })),
    on(TodosActions.delete, (state, payload) => ({
        ...state,
        todos: state.todos.filter((todo: Todo) => todo.id !== payload.id),
    }))
);