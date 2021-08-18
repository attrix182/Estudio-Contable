import { PostComponent } from './pages/post/post.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';

const routes: Routes = [

  { path: '', component:  HeaderComponent},
  { path: 'post', component:  PostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }