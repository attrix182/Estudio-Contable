import { SobreNosotrosComponent } from './pages/sections/sobre-nosotros/sobre-nosotros.component';
import { CertificacionesComponent } from './pages/sections/certificaciones/certificaciones.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { LoginComponent } from './pages/login/login.component';



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './pages/body/body.component';
import { CheckLoginGuard } from './shared/guard/check-login.guard';
import { ServiciosComponent } from './pages/sections/servicios/servicios.component';


const routes: Routes = [

  { path: '', component: BodyComponent, pathMatch: 'full' },
  {
    path: 'servicios', component: ServiciosComponent,
  },
  {
    path: 'certificaciones', component: CertificacionesComponent,
  },
  {
    path: 'about', component: SobreNosotrosComponent,
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'panel', component: AdminPanelComponent,
    canActivate: [CheckLoginGuard]
  },

  {
    path: '**', redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }