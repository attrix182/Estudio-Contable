import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @ViewChild('nav__logo_img', { static: true }) nav_img: any;
  @ViewChild('nav__logo', { static: true }) nav_logo: any;
  @Output() showNavBar: EventEmitter<any> = new EventEmitter<any>();
  flag: boolean = true;
  constructor(private render: Renderer2) {


  }
  ngOnInit(): void {

    if (window.scrollY == 0) {
      this.render.setAttribute(this.nav_img.nativeElement, 'style', "visibility:hidden;");
      this.render.setAttribute(this.nav_logo.nativeElement, 'style', "padding-left:6em;");
    }

  }
  @HostListener('window:scroll', ['$event']) onscroll() {


    if (window.scrollY > 217) {

      this.render.setAttribute(this.nav_img.nativeElement, 'style', "width:3em;position:relative;visibility:none;");
      this.render.setAttribute(this.nav_logo.nativeElement, 'style', "padding-left:6em;");
    } else if (window.scrollY < 217) {
      this.render.setAttribute(this.nav_img.nativeElement, 'style', "visibility:hidden;");
      this.render.setAttribute(this.nav_logo.nativeElement, 'style', "padding-left:6em;");
    }
    if (window.matchMedia("(min-width: 992px)").matches == false) {
      this.render.setAttribute(this.nav_logo.nativeElement, 'style', "padding-left:0em;");
    }
  }

  showItems() {
    if (this.flag) {
      this.showNavBar.emit(true);
      this.flag = false;
    } else {
      this.showNavBar.emit(false);
      this.flag = true;
    }
  }



}