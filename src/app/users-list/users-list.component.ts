import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "./users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserFormComponent } from "./create-user-form/create-user-form.component";
import { HttpClient } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { UsersActions } from "./store/users.actions";
import { selectUsers } from "./store/users.selector";
import { MatSnackBar } from "@angular/material/snack-bar";

export interface User {
    id: number;
    name: string;
    username?: string;
    email: string;
    address?: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    }
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase?: string;
        bs?: string;
    }
}

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, MatIconModule],
    templateUrl: "./users-list.component.html",
    styleUrl: "./users-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
    readonly usersApiService = inject(UsersApiService);
    readonly apiService = inject(HttpClient);

    readonly dialog = inject(MatDialog);
    private snackBar = inject(MatSnackBar);

    private showSnackBarUser(message: string, action: string = 'OK', duration: number = 3000): void {
        this.snackBar.open(message, action, { duration });
    }

    private readonly store = inject(Store);
    public readonly users$ = this.store.select(selectUsers);

    constructor() {
        this.usersApiService.getUsers().subscribe(
            (response: User[]) => {
                this.store.dispatch(UsersActions.loadSuccess({ users: response }));
            });
    }

    deleteUser(id: number) {
        this.store.dispatch(UsersActions.delete({ id }));
    }

    editUser(user: User) {
        this.store.dispatch(UsersActions.edit({ user }));
    }

    createUser(formData: User) {
        this.store.dispatch(UsersActions.create({
            user: {
                id: new Date().getTime(),
                name: formData.name,
                email: formData.email,
                website: formData.website,
                phone: formData.phone,
                company: {
                    name: formData.company.name
                },
            }
        }))
    }

    openDialogCreate(): void {
        const dialogRef = this.dialog.open(CreateUserFormComponent);

        dialogRef.afterClosed().subscribe((result: User) => {
            if (result) {
                this.showSnackBarUser('Пользователь добавлен', 'ОК');
                this.createUser(result);
            } else {
                this.showSnackBarUser('Добавление отменено', 'ОК');
            }
        });
    }
}
