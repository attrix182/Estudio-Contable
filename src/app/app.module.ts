import { AngularFireAuthModule } from '@angular/fire/auth';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { BodyComponent } from './pages/body/body.component';
import { AboutComponent } from './component/about/about.component';
import { NewsComponent } from './component/news/news.component';
import { ContactComponent } from './component/contact/contact.component';
import { FooterComponent } from './component/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgrandarDirective } from './directivas/agrandar.directive';
import { InfiniteCarouselComponent } from './component/infinite-carousel/infinite-carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { LinksComponent } from './component/links/links.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { CarouselModule } from 'ng-carousel-cdk';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    InfiniteCarouselComponent,
    LoginComponent,
    LinksComponent,
    AdminPanelComponent,
    AddPostComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxHideOnScrollModule,
    NgxPageScrollModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    CarouselModule,
    IvyCarouselModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebaseConfig)
    ],
    exports:[CarouselModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
