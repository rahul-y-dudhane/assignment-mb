import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'home',
    loadChildren: () => import('./module/home/home.module').then(res => res.HomeModule)
  },
  {
    path:'dashboard',
    loadChildren: () => import('./module/dashboard/dashboard.module').then(res => res.DashboardModule)
  },
  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
