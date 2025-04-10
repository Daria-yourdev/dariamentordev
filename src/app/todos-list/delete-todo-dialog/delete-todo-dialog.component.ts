import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent } from "@angular/material/dialog";
import { Todo } from "../todos-list.component";

@Component({
    selector: 'app-delete-todo-dialog',
    templateUrl: './delete-todo-dialog.component.html',
    styleUrl: './delete-todo-dialog.component.scss',
    standalone: true,
    imports: [MatDialogContent, MatDialogActions, MatDialogClose]
})
export class DeleteTodoDialogComponent{

    public readonly data = inject<{todo: Todo}>(MAT_DIALOG_DATA);

    readonly dialog = inject(MatDialog);
}