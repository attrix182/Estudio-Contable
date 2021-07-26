import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { HeaderComponent } from './component/header/header.component';
import { AboutComponent } from './component/about/about.component';
import { NewsComponent } from './component/news/news.component';
import { ContactComponent } from './component/contact/contact.component';
import { FooterComponent } from './component/footer/footer.component';
import { ScrollNavDirective } from './directivas/scroll-nav.directive';

import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    AboutComponent,
    NewsComponent,
    ContactComponent,
    FooterComponent,
    ScrollNavDirective
  ],
  imports: [
    BrowserModule,
    NgxHideOnScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
