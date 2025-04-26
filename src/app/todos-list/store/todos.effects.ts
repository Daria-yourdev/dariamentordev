import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TodosApiService } from '../todos-api.service';
import { TodosActions } from './todos.actions';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.load),
      mergeMap(() =>
        this.todosApiService.getTodos().pipe(
          map((todos) => TodosActions.set({ todos })),
          catchError((error) =>
            of(
              TodosActions.loaderror({
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
  ) {}
}