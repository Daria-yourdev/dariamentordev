import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TodosApiService } from '../todos-api.service';
import { TodosActions } from './todos.actions';
import { Todo } from '../todos-list.component';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.load),
      mergeMap(() =>
        this.todosApiService.getTodos().pipe(
          map((todos: Todo[]) => TodosActions.loadSuccess({ todos })),
          catchError((error: string) =>
            of(
              TodosActions.loadError({
                error: 'не удалось загрузить задачи',
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todosApiService: TodosApiService
  ) { }
}