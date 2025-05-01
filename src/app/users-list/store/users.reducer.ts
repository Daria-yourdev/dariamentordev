import { createReducer, on } from "@ngrx/store";
import { User } from "../users-list.component";
import { UsersActions } from "./users.actions";

const initialState: { users: User[] } = {
    users: [],
};

export const userReducer = createReducer(
    initialState,
    on(UsersActions.loadSuccess, (state, payload) => ({
        ...state,
        users: payload.users,
    })),
    on(UsersActions.edit, (state, payload) => ({
        ...state,
        users: state.users.map((user: User) => {
            return user.id === payload.user.id ? payload.user : user;
        }),
    })),
    on(UsersActions.create, (state, payload) => ({
        ...state,
        users: [payload.user, ...state.users],
    })),
    on(UsersActions.delete, (state, payload) => ({
        ...state,
        users: state.users.filter((user: User) => user.id !== payload.id),
    }))
);