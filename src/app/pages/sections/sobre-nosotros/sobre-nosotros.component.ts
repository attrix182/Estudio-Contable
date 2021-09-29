import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css']
})
export class SobreNosotrosComponent implements OnInit {

  @ViewChild('nav__logo_img', { static: true }) logo_img: any;

  constructor(private render: Renderer2) {}

  ngOnInit(): void {

  }
  hiddeLogo(flag: boolean) {
    if (flag) {
      this.render.setAttribute(this.logo_img.nativeElement, 'style', "position: absolute; z-index: 10; width: 10em;");
    } else {
      this.render.setAttribute(this.logo_img.nativeElement, 'style', "position: absolute; z-index: 200; width: 10em;");
    }
  }
}