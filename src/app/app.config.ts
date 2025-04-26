import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { userReducer } from './users-list/store/users.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { todoReducer } from './todos-list/store/todos.reducer';
import { provideEffects } from '@ngrx/effects';
import { TodoEffects } from './todos-list/store/todos.effects';
import { UserEffects } from './users-list/store/users.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(),
  provideAnimationsAsync(),
  provideStore({
    users: userReducer,
    todos: todoReducer
  }),
  provideEffects([UserEffects, TodoEffects]),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};