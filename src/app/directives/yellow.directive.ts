import { Directive, HostListener, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[yellow]',
  standalone: true
})
export class YellowDirective {

  bgColor = 'transparent';

  @HostBinding('style.backgroundColor')
  get backgroundColor() {
    return this.bgColor;
  }

  @HostListener('mouseenter')
  enter() {
    this.bgColor = '#f0ba4e';
  }

  @HostListener('mouseleave')
  leave() {
    this.bgColor = 'transparent';
  }
}