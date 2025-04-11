import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { Todo } from "../todos-list.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from "@angular/material/snack-bar";
import { DeleteTodoDialogComponent } from "../delete-todo-dialog/delete-todo-dialog.component";
import { EditTodoDialogComponent } from "../edit-todo-dialog/edit-todo-dialog.component";
import { MatIconModule } from "@angular/material/icon";

@Component({
    selector: 'app-todo-card',
    standalone: true,
    templateUrl: './todo-card.component.html',
    styleUrl: './todo-card.component.scss',
    imports: [MatDialogModule, MatCardModule, MatDividerModule, MatIconModule]
})

export class TodoCardComponent {

    @Input() todo!: Todo

    @Output()
    editTodo = new EventEmitter()

    @Output()
    deleteTodo = new EventEmitter()

    readonly dialog = inject(MatDialog);
    private snackBar = inject(MatSnackBar);

    private showSnackBarTodo(message: string, action: string = 'OK', duration: number = 3000): void {
        this.snackBar.open(message, action, { duration });
    }

    openDialogEdit(): void {
        const dialogRef = this.dialog.open(EditTodoDialogComponent, {
            data: { todo: this.todo },
        });

        dialogRef.afterClosed().subscribe((editResult: Todo | undefined) => {
            if (editResult) {
                this.showSnackBarTodo('Задача отредактирована', 'ОК');
                this.editTodo.emit(editResult);
            } else {
                this.showSnackBarTodo('Редактирование отменено', 'ОК');
            }
        });
    }

    openDialogDelete(): void {
        const dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
            data: { todo: this.todo.id },
        });

        dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
            if (result) {
                this.showSnackBarTodo('Задача удалена', 'ОК');
                this.deleteTodo.emit(this.todo.id);
            } else {
                this.showSnackBarTodo('Отмена удаления', 'ОК');
            }
        });
    }

    onDeleteTodo(todoid: number) {
        this.deleteTodo.emit(todoid)
    }
}