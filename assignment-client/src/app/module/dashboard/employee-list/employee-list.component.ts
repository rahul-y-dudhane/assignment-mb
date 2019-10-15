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
      if (res) {
        this.user = res as UserModel;
        this.getAllEmployees();
      } else {
        this.toastService.activate('Try login');
        this.router.navigate(['/home/login']);
      }
    })
  }

  /**
   * @function getAllEmployees
   * @description Get all employees from server
   */
  getAllEmployees() {
    this.apiService.request('GET_ALL_EMPLYEES').subscribe(result => {
      this.allEmployees = [];
      this.allEmployees = result.data as UserModel[];
    });
  }

  /**
   * @function addNewEmployee
   * @description Open add new employee modal
   */
  addNewEmployee() {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: "550px",
      height: "525px"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllEmployees();
    });
  }

  /**
   * @function onChanges
   * @description Called when something changes in employee
   */
  onChanges() {
    this.getAllEmployees();
  }

  /**
   * @function logout
   * @description Logout from portal
   */
  logout() {
    this.userSub ? this.userSub.unsubscribe() : null;
    this.router.navigate(['/home/login']);
    this.userService.setLoggedInUser(null);
  }
}
