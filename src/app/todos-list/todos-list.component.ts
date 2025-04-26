import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodoCardComponent } from "./todo-card/todo-card.component";
import { TodosApiService } from "./todos-api.service";
import { HttpClient } from "@angular/common/http";
import { CreateTodoFormComponent } from "./create-todo-form/create-todo-form.component";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { TodosActions } from "./store/todos.actions";
import { selectTodos } from "./store/todos.selector";
import { MatSnackBar } from "@angular/material/snack-bar";

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

    readonly dialog = inject(MatDialog);
    private snackBar = inject(MatSnackBar);

    private showSnackBarUser(message: string, action: string = 'OK', duration: number = 3000): void {
        this.snackBar.open(message, action, { duration });
    }

    private readonly store = inject(Store);
    public readonly todos$ = this.store.select(selectTodos);

    constructor() {
        this.todosApiService.getTodos().subscribe(
            (response: Todo[]) => {
                this.store.dispatch(TodosActions.set({ todos: response }));
            }
        )
    }

    deleteTodo(id: number) {
        this.store.dispatch(TodosActions.delete({ id }));
    }

    editTodo(todo: Todo) {
        this.store.dispatch(TodosActions.edit({ todo }));
    }

    createTodo(todoData: Todo) {
        this.store.dispatch(
            TodosActions.create({
                todo: {
                    id: new Date().getTime(),
                    userId: todoData.userId,
                    title: todoData.title,
                    completed: todoData.completed
                },
            }),
        );
    }

    openDialogCreate(): void {
        const dialogRef = this.dialog.open(CreateTodoFormComponent);

        dialogRef.afterClosed().subscribe((result: Todo) => {
            if (result) {
                this.showSnackBarUser('Задача добавлена', 'OK');
                this.createTodo(result);
            } else {
                this.showSnackBarUser('Добавление отменено', 'OK');
            }
        });
    }
}