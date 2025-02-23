import { Component, inject } from "@angular/core";
import { NgFor } from "@angular/common";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosApiService } from "./todod-api.service";

export interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [NgFor, TodoCardComponent],
    templateUrl: "./todos-list.component.html",
    styleUrl: "./todos-list.component.scss",
})

export class TodosListComponent {
    readonly todosApiService = inject(TodosApiService);

    todos: Todo[] = [];

    constructor() {
        this.todosApiService.getTodos().subscribe(
            (response: any) => {
                this.todos = response;
            }
        )
    }

    deleteTodo (id: number) {
        this.todos = this.todos.filter(
            item => item.id != id
        )
    }

}