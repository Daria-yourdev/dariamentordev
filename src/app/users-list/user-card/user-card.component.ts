import { EventEmitter, NgModule, Output } from "@angular/core";
import { Component, Input } from "@angular/core";
import { UsersListComponent } from "../users-list.component";

@Component({
    selector: 'app-user-card',
    standalone: true,
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
    @Input() user: any;

    @Output()
    deleteUser = new EventEmitter()

    onDeleteUser (userId: number) {
        this.deleteUser.emit(userId)
    }
}

