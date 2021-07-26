  
import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appScrollNav]'
})
export class ScrollNavDirective {


  @Output() scrollPos:EventEmitter<any> = new EventEmitter()

  state = 'normal'

  constructor(public el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  checkScroll(): any {
    const componentPosition = this.el.nativeElement.offsetTop
    const scrollPosition = window.pageYOffset

   // console.log(componentPosition)

    if (scrollPosition >= componentPosition) {
      this.state = 'scrolled'
    } else {
      this.state = 'normal'
    }

 this.scrollPos.emit(scrollPosition)

  
    
  }


}