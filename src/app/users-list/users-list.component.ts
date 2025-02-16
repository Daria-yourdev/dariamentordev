import { NgFor } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    }
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    }
}

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [NgFor],
    templateUrl: "./users-list.component.html", // ./ в этой же папке ../ в родительской папке
    styleUrl: "./users-list.component.scss",
})

export class UsersListComponent {
    readonly apiService = inject(HttpClient); // поле класса
    users = [];


    constructor() {
        this.apiService.get('https://jsonplaceholder.typicode.com/users').subscribe(
            (response: any) => {
                this.users = response;
                console.log("USERS: ", this.users);
            }
        )

    }

    deleteUser(id: number) {
        this.users = this.users.filter(
            // @ts-ignore
            item => item.id !== id
        )
    }
}