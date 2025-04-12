import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[shadow]',
    standalone: true
})
export class ShadowDirective {

    @HostBinding('style.boxShadow')
    shadow = 'none';

    @HostListener('mouseenter')
    enter() {
        this.shadow = '0px 20px 50px rgba(18, 17, 39, 0.08)';
    }

    @HostListener('mouseleave')
    leave() {
        this.shadow = 'none';
    }
}