import { EventEmitter, inject, NgModule, Output } from "@angular/core";
import { Component, Input } from "@angular/core";
import { User, UsersListComponent } from "../users-list.component";
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";

@Component({
    selector: 'app-user-card',
    standalone: true,
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
    @Input() user!: User

    @Output()
    deleteUser = new EventEmitter()

    @Output()
    editUser = new EventEmitter()

    readonly dialog = inject(MatDialog);

    openDialog(): void {
        this.dialog
            .open(EditUserDialogComponent, {
                data: { user: this.user },
            })
            .afterClosed()
            .subscribe(editResult => {
                this.editUser.emit(editResult)
            });

    }

    onDeleteUser(userId: number) {
        this.deleteUser.emit(userId)
    }
}

