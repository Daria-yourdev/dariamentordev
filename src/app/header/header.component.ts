import { DatePipe, NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

const menuItems = ['Каталог', 'стройматериалы', 'Инструменты', 'Электрика'];

const upperCaseMenuItems = menuItems.map(
    (item) => {
        return item.toUpperCase();
    }
)

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgIf, NgFor, RouterLink, DatePipe],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    title = 'mentoring-first-project';

    currentDate: Date = new Date();

    isShowCatalog = true;

    menuItems = upperCaseMenuItems;
    isUpperCase = true;

    changeMenuText() {
        this.menuItems = upperCaseMenuItems.map(
            item => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
        )

        this.isUpperCase = !this.isUpperCase;
    }


    readonly main = 'Главная';

    readonly aboutcompany = 'О компании';

    readonly catalog = 'Каталог';

    readonly users = "Пользователи";
    
    readonly todos = 'Задачи';
}