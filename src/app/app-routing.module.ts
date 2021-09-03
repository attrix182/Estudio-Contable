import { PostComponent } from './pages/post/post.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './pages/body/body.component';

const routes: Routes = [

  { path: '', component:  BodyComponent},
  { path: 'post', component:  PostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }