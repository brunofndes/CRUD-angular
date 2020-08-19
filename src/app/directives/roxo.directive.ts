import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRoxo]'
})
export class RoxoDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#6900d381'
  }

}