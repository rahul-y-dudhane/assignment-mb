import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/core/models/user.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee: UserModel;
  @Output() onChange = new EventEmitter();

  constructor(private apiService: ApiService,
          private toastService: ToastService,
          private dialog: MatDialog) { }

  ngOnInit() {
  }

  delete(){
    let data = {
      id: this.employee.id
    }
    this.apiService.request('DELETE_EMPLOYEE',{data}).subscribe((res) =>{
      if(res.success){
        this.toastService.activate('Deleted!');
        this.onChange.emit();
      } else {
        this.toastService.activate(res.message);
      }
    })
  }

  edit(){
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: "550px",
      height: "525px",
      data:{
        employee: this.employee
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.onChange.emit();
    });
  }

}
