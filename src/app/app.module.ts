import { AngularFireAuthModule } from '@angular/fire/auth';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BodyComponent } from './pages/body/body.component';
import { AboutComponent } from './components/about/about.component';
import { NewsComponent } from './components/news/news.component';
import { NewsAdminComponent } from './components/newsAdmin/newsAdmin.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgrandarDirective } from './shared/directives/agrandar.directive';
import { InfiniteCarouselComponent } from './components/infinite-carousel/infinite-carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { LinksComponent } from './components/links/links.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { CarouselModule } from 'ng-carousel-cdk';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxImageCompressService} from 'ngx-image-compress';
import { ServiciosComponent } from './pages/sections/servicios/servicios.component';
import { CertificacionesComponent } from './pages/sections/certificaciones/certificaciones.component';
import { SobreNosotrosComponent } from './pages/sections/sobre-nosotros/sobre-nosotros.component';
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
    ServiciosComponent,
    CertificacionesComponent,
    SobreNosotrosComponent,
    NewsAdminComponent
    
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
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
