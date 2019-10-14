import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserModel } from 'src/app/core/models/user.model';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  user: UserModel = null;
  userSub: Subscription;
  allEmployees: UserModel[] = []
  constructor(private userService: UserService,
          private toastService: ToastService,
          private router: Router,
          private apiService: ApiService,
          public dialog: MatDialog) { }

  ngOnInit() {
    this.userSub = this.userService.getLoggedInUser().subscribe(res => {
      if(res){
        this.user = res as UserModel;
       this.getAllEmployees();
      }else{
        this.toastService.activate('Try login');
        this.router.navigate(['/home/login']);
      }
    })
  }

  getAllEmployees(){
    this.apiService.request('GET_ALL_EMPLYEES').subscribe(result => {
      this.allEmployees = [];
      this.allEmployees = result.data as UserModel[];
      this.allEmployees.push({
    address: "At-Post- Khingar,↵Tal- Mahabaleshwar,↵Dist- Satara.↵Via- Panchgani",
    company: "Pune 1",
    dateOfBirth: "2019-10-29",
    email: "vaibgav@gmail.com",
    firstName: "Vaibhav",
    id: 18,
    lastName: "Dudhane",
    mobileNo: "7798863331",
    type: "employee"
  })
    });
  }

  addNewEmployee(){
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: "550px",
      height: "525px"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllEmployees();
    });
  }

  onChanges(){
    this.getAllEmployees();
  }

  logout(){
    this.userSub ? this.userSub.unsubscribe() : null;
    this.router.navigate(['/home/login']);
    this.userService.setLoggedInUser(null);
  }

}
