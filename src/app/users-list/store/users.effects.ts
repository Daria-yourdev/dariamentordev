import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UsersActions } from './users.actions';
import { UsersApiService } from '../users-api.service';
import { User } from '../users-list.component';

@Injectable()
export class UserEffects {
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.load),
            mergeMap(() =>
                this.usersApiService.getUsers().pipe(
                    map((users: User[]) => UsersActions.loadSuccess({ users })),
                    catchError((error: string) =>
                        of(
                            UsersActions.loadError({
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
        private usersApiService: UsersApiService
    ) { }
}