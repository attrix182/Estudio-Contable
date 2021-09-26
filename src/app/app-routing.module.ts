import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { LoginComponent } from './pages/login/login.component';



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './pages/body/body.component';
import { CheckLoginGuard } from './shared/guard/check-login.guard';
import { AddPostComponent } from './pages/add-post/add-post.component';

const routes: Routes = [

  { path: '', component: BodyComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'panel', component: AdminPanelComponent,
    canActivate: [CheckLoginGuard]
  },
  {
    path: 'addPost', component: AddPostComponent
  },
  { path: '**', component: BodyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }