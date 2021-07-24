import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { HeaderComponent } from './component/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
