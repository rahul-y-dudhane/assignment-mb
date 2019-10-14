import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
  path: '',
  component: EmployeeListComponent,
  },
  {
    path:'**',
    redirectTo: ''
  }
]

@NgModule({
  declarations: [EmployeeListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
