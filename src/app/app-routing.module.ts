import { DrawComponent } from './pages/draw/draw.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { SignInComponent } from 'src/app/pages/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/pages/sign-up/sign-up.component';
import { AuthGuard } from './auth-guard/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
const routes: Routes = [
  {
    path: 'ruf-coffee-house',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'draw',
    component: DrawComponent,
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
