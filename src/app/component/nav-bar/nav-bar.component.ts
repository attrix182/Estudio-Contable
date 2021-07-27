import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @ViewChild('nav__logo_img', { static: true }) nav_img: any;
  @ViewChild('nav__logo', { static: true }) nav_logo: any;

  constructor(private render: Renderer2) {


  }
  ngOnInit(): void {
    
    if (window.scrollY == 0) {
      this.render.setAttribute(this.nav_img.nativeElement, 'style', "visibility:hidden;");
      this.render.setAttribute(this.nav_logo.nativeElement, 'style', "padding-left:7em;");
    }

  }

  @HostListener('window:scroll', ['$event']) onscroll() {


     if (window.scrollY > 217) {

      this.render.setAttribute(this.nav_img.nativeElement, 'style', "width:3em;position:relative;visibility:none;");
      this.render.setAttribute(this.nav_logo.nativeElement, 'style', "padding-left:0;");
    } else if (window.scrollY < 217) {
      this.render.setAttribute(this.nav_img.nativeElement, 'style', "visibility:hidden;");
      this.render.setAttribute(this.nav_logo.nativeElement, 'style', "padding-left:7em;");
    }

  }



}