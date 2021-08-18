
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { BodyComponent } from './component/body/body.component';
import { AboutComponent } from './component/about/about.component';
import { NewsComponent } from './component/news/news.component';
import { ContactComponent } from './component/contact/contact.component';
import { FooterComponent } from './component/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgrandarDirective } from './directivas/agrandar.directive';
import { PostComponent } from './pages/post/post.component';
import { InfiniteCarouselComponent } from './pages/infinite-carousel/infinite-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    BodyComponent,
    AboutComponent,
    NewsComponent,
    ContactComponent,
    FooterComponent,
    AgrandarDirective,
    PostComponent,
    InfiniteCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxHideOnScrollModule,
    NgxPageScrollModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
