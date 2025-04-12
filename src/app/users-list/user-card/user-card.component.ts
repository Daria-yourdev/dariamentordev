import { EventEmitter, inject, NgModule, Output } from "@angular/core";
import { Component, Input } from "@angular/core";
import { User } from "../users-list.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { DeleteUserDialogComponent } from "../delete-user-dialog/delete-user-dialog.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from "@angular/material/icon";
import { RemoveSlashesPipe } from "../../pipes/remove-slashes.pipe";
import { ShadowDirective } from "../../directives/shadow.directive";

@Component({
    selector: 'app-user-card',
    standalone: true,
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
    imports: [MatDialogModule, MatCardModule, MatDividerModule, MatIconModule, RemoveSlashesPipe, ShadowDirective]
})
export class UserCardComponent {

    @Input() user!: User

    @Output()
    editUser = new EventEmitter()

    @Output()
    deleteUser = new EventEmitter()

    readonly dialog = inject(MatDialog);
    private snackBar = inject(MatSnackBar);

    private showSnackBarUser(message: string, action: string = 'OK', duration: number = 3000): void {
        this.snackBar.open(message, action, { duration });
    }

    openDialogEdit(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            data: { user: this.user },
        });

        dialogRef.afterClosed().subscribe((editResult: User | undefined) => {
            if (editResult) {
                this.showSnackBarUser('Пользователь отредактирован', 'ОК');
                this.editUser.emit(editResult);
            } else {
                this.showSnackBarUser('Редактирование отменено', 'ОК');
            }
        });
    }

    openDialogDelete(): void {
        const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
            data: { user: this.user.id },
        });

        dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
            if (result) {
                this.showSnackBarUser('Пользователь удален', 'ОК');
                this.deleteUser.emit(this.user.id);
            } else {
                this.showSnackBarUser('Отмена удаления', 'ОК');
            }
        });
    }

    onDeleteUser(userId: number) {
        this.deleteUser.emit(userId)
    }
}

