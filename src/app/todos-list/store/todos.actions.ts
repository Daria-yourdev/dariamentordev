import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Todo } from "../todos-list.component";
import { provideProtractorTestingSupport } from "@angular/platform-browser";

export const TodosActions = createActionGroup({
    source: 'Todos',
    events: {
        'load': emptyProps(),
        'loadError': props<{ error: string }>(),
        'loadSuccess': props<{ todos: Todo[] }>(),
        'edit': props<{ todo: Todo }>(),
        'create': props<{ todo: Todo }>(),
        'delete': props<{ id: number }>(),
    },
});
