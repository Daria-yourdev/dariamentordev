import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosApiService } from "./todos-api.service";
import { HttpClient } from "@angular/common/http";
import { TodosService } from "./todos.service";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";

export interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
    templateUrl: "./todos-list.component.html",
    styleUrl: "./todos-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
    readonly todosApiService = inject(TodosApiService);
    readonly apiService = inject(HttpClient);
    readonly todosService = inject(TodosService);

    constructor() {
        this.todosApiService.getTodos().subscribe(
            (response: Todo[]) => {
                this.todosService.setTodos(response);
            }
        )
    }

    deleteTodo(id: number) {
        this.todosService.deleteTodo(id);
    }

    createTodo(todoData: Todo) {
        this.todosService.createTodo({
            id: new Date().getTime(),
            userId: todoData.userId,
            title: todoData.title,
            completed: todoData.completed
        })
    }

}