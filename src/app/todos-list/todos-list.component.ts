import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosApiService } from "./todos-api.service";
import { HttpClient } from "@angular/common/http";
import { TodosService } from "./todos.service";
import { CreateTodoFormComponent } from "./create-todo-form/create-todo-form.component";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";

export interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [NgFor, TodoCardComponent, AsyncPipe, MatIconModule, MatDialogModule],
    templateUrl: "./todos-list.component.html",
    styleUrl: "./todos-list.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
    readonly todosApiService = inject(TodosApiService);
    readonly apiService = inject(HttpClient);
    readonly todosService = inject(TodosService);

    readonly dialog = inject(MatDialog);

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

    editTodo(todo: Todo) {
        this.todosService.editTodos(todo);
    }

    createTodo(todoData: Todo) {
        this.todosService.createTodo({
            id: new Date().getTime(),
            userId: todoData.userId,
            title: todoData.title,
            completed: todoData.completed
        })
    }

    openDialogCreate(): void {
        const dialogRef = this.dialog.open(CreateTodoFormComponent);

        dialogRef.afterClosed().subscribe((result: Todo) => {
            this.createTodo(result)
        });
    }
}