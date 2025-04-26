import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../users-list.component";

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'load': emptyProps(),
        'loaderror': props<{ error: string }>(),
        'set': props<{ users: User[] }>(),
        'edit': props<{ user: User }>(),
        'create': props<{ user: User }>(),
        'delete': props<{ id: number }>(),
    },
});