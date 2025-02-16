import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

const menuItems = ['Каталог', 'стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда'];

const upperCaseMenuItems = menuItems.map(
    (item) => {
        return item.toUpperCase();
    }
)

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgIf, NgFor, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    title = 'mentoring-first-project';

    isShowCatalog = true;

    menuItems = upperCaseMenuItems;
    isUpperCase = true;

    changeMenuText() {
        this.menuItems = upperCaseMenuItems.map(
            item => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
        )

        this.isUpperCase = !this.isUpperCase;
    }


    readonly Main = 'Главная';

    readonly AboutCompany = 'О компании';

    readonly Catalog = 'Каталог';

    readonly Users = "Пользователи";
}