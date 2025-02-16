import { Component } from "@angular/core";

const newPages = [5, 4, 3, 2, 1];

@Component({
    selector: 'app-mainpage',
    templateUrl: './mainpage.component.html',
    styleUrl: './mainpage.component.scss'
})
export class MainPageComponent {
    isShowBanner = true;

    readonly newPages = newPages;
}