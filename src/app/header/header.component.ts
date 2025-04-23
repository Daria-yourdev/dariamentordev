import { DatePipe, NgFor, NgIf, AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { YellowDirective } from "../directives/yellow.directive";
import { MatIcon } from "@angular/material/icon";
import { MatTooltipModule, TooltipPosition } from "@angular/material/tooltip";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../users-list/user.service";
import { AuthorisationDialogComponent } from "../authorisation-dialog/auth-dialog.component";

const menuItems = ['Каталог', 'стройматериалы', 'Инструменты', 'Электрика'];

const upperCaseMenuItems = menuItems.map(
    (item) => {
        return item.toUpperCase();
    }
)

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgIf, NgFor, RouterLink, DatePipe, YellowDirective, MatIcon, MatTooltipModule, AsyncPipe],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    title = 'mentoring-first-project';

    currentDate: Date = new Date();

    isShowCatalog = true;

    menuItems = upperCaseMenuItems;
    isUpperCase = true;

    readonly dialog = inject(MatDialog);
    readonly userService = inject(UserService);

    changeMenuText() {
        this.menuItems = upperCaseMenuItems.map(
            item => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
        )

        this.isUpperCase = !this.isUpperCase;
    }

    openDialogLogIn(): void {
        const dialogRef = this.dialog.open(AuthorisationDialogComponent);

        dialogRef.afterClosed().subscribe((result: string) => {
            if (result == 'admin') {
                this.userService.loginAsAdmin();
            } else if (result == 'user') {
                this.userService.loginAsUser();
            }
        });
    }

    public logout() {
        this.userService.logout()
    }

    readonly main = 'Главная';

    readonly aboutcompany = 'О компании';

    readonly catalog = 'Каталог';

    readonly users = "Пользователи";

    readonly todos = 'Задачи';
}