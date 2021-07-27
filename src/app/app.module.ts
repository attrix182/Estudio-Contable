
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { HeaderComponent } from './component/header/header.component';
import { AboutComponent } from './component/about/about.component';
import { NewsComponent } from './component/news/news.component';
import { ContactComponent } from './component/contact/contact.component';
import { FooterComponent } from './component/footer/footer.component';

import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';
import { NgxPageScrollModule } from 'ngx-page-scroll';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    AboutComponent,
    NewsComponent,
    ContactComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgxHideOnScrollModule,
    NgxPageScrollModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
