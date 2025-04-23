import { Component, inject } from "@angular/core";
import { MatDialog, MatDialogActions, MatDialogClose } from "@angular/material/dialog";

@Component({
    selector: 'app-auth-dialog',
    standalone: true,
    templateUrl: 'auth-dialog.component.html',
    styleUrl: 'auth-dialog.component.scss',
    imports: [MatDialogActions, MatDialogClose]
})
export class AuthorisationDialogComponent {
    private readonly dialog = inject(MatDialog)
}