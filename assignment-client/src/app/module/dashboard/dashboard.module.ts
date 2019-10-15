import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/core/shared.module';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

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
  declarations: [
    EmployeeListComponent, 
    EmployeeCardComponent, 
    AddEmployeeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  entryComponents:[AddEmployeeComponent]
})
export class DashboardModule { }
