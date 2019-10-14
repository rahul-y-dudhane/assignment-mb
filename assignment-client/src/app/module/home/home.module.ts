import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from 'src/app/core/shared.module';

const routes: Routes = [{
  path: '',
  component: LandingPageComponent,
  children: [
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: SignupComponent
    },
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path:'**',
      redirectTo:'login'
    }]
}]

@NgModule({
  declarations: [LoginComponent, SignupComponent, LandingPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class HomeModule { }
