import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { MainPageComponent } from './mainpage/mainpage.component';

export const routes: Routes = [
    {
        path: '',
        component: MainPageComponent
    },
    {
        path: 'users',
        component: UsersListComponent
    }
];
