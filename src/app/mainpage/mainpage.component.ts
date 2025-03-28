import { NgIf } from "@angular/common";
import { Component } from "@angular/core";

const newPages = [5, 4, 3, 2, 1];

@Component({
    selector: 'app-mainpage',
    standalone: true,
    imports: [NgIf],
    templateUrl: './mainpage.component.html',
    styleUrl: './mainpage.component.scss'
})
export class MainPageComponent {
    isShowBanner = true;

    readonly newPages = newPages;
}