import { createReducer, on } from "@ngrx/store";
import { Todo } from "../todos-list.component";
import { TodosActions } from "./todos.actions";

const initiaLState: { todos: Todo[] } = {
    todos: [],
};

export const todoReducer = createReducer(
    initiaLState,
    on(TodosActions.set, (state, payload) => ({
        ...state,
        todos: payload.todos,
    })),
    on(TodosActions.edit, (state, payload) => ({
        ...state,
        todos: state.todos.map((todo) => {
            if (todo.id === payload.todo.id) {
                return payload.todo;
            } else {
                return todo;
            }
        }),
    })),
    on(TodosActions.create, (state, payload) => ({
        ...state,
        todos: [payload.todo, ...state.todos],
    })),
    on(TodosActions.delete, (state, payload) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload.id),
    }))
);