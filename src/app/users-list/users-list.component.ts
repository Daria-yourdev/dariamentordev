import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "./users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "./users.service";
import { CreateUserFormComponent } from "../create-user-fom/create-user-form.component";

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
    imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent],
    templateUrl: "./users-list.component.html",
    styleUrl: "./users-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
    readonly usersApiService = inject(UsersApiService);
    readonly usersService = inject(UsersService);

    constructor() {
        this.usersApiService.getUsers().subscribe(
            (response: User[]) => {
                this.usersService.setUsers(response);
            });

            this.usersService.users$.subscribe((users) => console.log(users));
    }

    deleteUser(id: number) {
        this.usersService.deleteUser(id);
    }

    public createUser(formDate: User) {
        this.usersService.createUser({
            id: new Date().getTime(),
            name: formDate.name,
            email: formDate.email,
            website: formDate.website,
            company: {
                name: formDate.name,
            }
        });
    }
}
