import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[scrollspyAnchor]'
})
export class AnchorDirective {
  @Input('scrollspyAnchor') anchorName: string;


  constructor(private el: ElementRef) { 

  }

}

interface AnchorOptions {
  name: string;
  icon: string;
  index: number;
  scrollContainer: HTMLElement | string
}