import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { LoginComponent } from './pages/login/login.component';
import { PostComponent } from './pages/post/post.component';



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './pages/body/body.component';
import { CheckLoginGuard } from './shared/guard/check-login.guard';

const routes: Routes = [

  { path: '', component: BodyComponent },
  { path: 'post', component: PostComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'panel', component: AdminPanelComponent,
    canActivate: [CheckLoginGuard]
  },
  { path: '**', component: BodyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }