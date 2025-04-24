import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { MainPageComponent } from './mainpage/mainpage.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: MainPageComponent
    },
    {
        path: 'users',
        component: UsersListComponent
    },
    {
        path: 'todos',
        component: TodosListComponent
    },
    {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [authGuard]
    },
];