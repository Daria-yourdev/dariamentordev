import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent } from "@angular/material/dialog";
import { User } from "../users-list.component";

@Component({
    selector: 'app-delete-user-dialog',
    templateUrl: './delete-user-dialog.component.html',
    styleUrl: './delete-user-dialog.component.scss',
    standalone: true,
    imports: [MatDialogContent, MatDialogActions, MatDialogClose]
})
export class DeleteUserDialogComponent {

    public readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);

    readonly dialog = inject(MatDialog);
}