import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "./users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "./users.service";
import { CreateUserFormComponent } from "./create-user-form/create-user-form.component";
import { HttpClient } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";

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
    phone?: string;
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
    readonly usersService = inject(UsersService);

    readonly dialog = inject(MatDialog);

    constructor() {
        this.usersApiService.getUsers().subscribe(
            (response: User[]) => {
                this.usersService.setUsers(response);
            });
    }

    deleteUser(id: number) {
        this.usersService.deleteUser(id);
    }

    editUser(user: User) {
        this.usersService.editUsers({
            ...user,
            company: {
                name: user.company.name
            }
        });
    }

    createUser(formData: User) {
        this.usersService.createUser({
            id: new Date().getTime(),
            name: formData.name,
            email: formData.email,
            website: formData.website,
            company: {
                name: formData.company.name
            },
        })
    }

    openDialogCreate(): void {
        const dialogRef = this.dialog.open(CreateUserFormComponent);

        dialogRef.afterClosed().subscribe((result: User) => {
            this.createUser(result);
        });
    }
}
