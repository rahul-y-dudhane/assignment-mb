import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup
  employee: UserModel = null;
  dateChanged = false;

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
   
    this.employee = this.data ? this.data.employee as UserModel : null;

    if (!this.employee) {

      this.addEmployeeForm = this.formBuilder.group({
        firstName: this.formBuilder.control(null, Validators.required),
        lastName: this.formBuilder.control(null, Validators.required),
        company: this.formBuilder.control(null, Validators.required),
        email: this.formBuilder.control(null, [Validators.required, Validators.email]),
        dateOfBirth: this.formBuilder.control(null, Validators.required),
        mobile: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^[789]\d{9}$/)]),
        address: this.formBuilder.control(null, Validators.required),
      });
    } else {
      this.addEmployeeForm = this.formBuilder.group({
        firstName: this.formBuilder.control(this.employee.firstName, Validators.required),
        lastName: this.formBuilder.control(this.employee.lastName, Validators.required),
        company: this.formBuilder.control(this.employee.company, Validators.required),
        email: this.formBuilder.control(this.employee.email, [Validators.required, Validators.email]),
        dateOfBirth: this.formBuilder.control(this.employee.dateOfBirth, Validators.required),
        mobile: this.formBuilder.control(this.employee.mobileNo, [Validators.required, Validators.pattern(/^[789]\d{9}$/)]),
        address: this.formBuilder.control(this.employee.address, Validators.required),
      });
    }

    this.addEmployeeForm.controls.dateOfBirth.valueChanges.subscribe(res => {
      this.dateChanged = true;
    })

  }

  saveOrUpdate() {
    this.employee ? this.update() : this.add();
  }

  add() {
    let data = {
      firstName: this.addEmployeeForm.value.firstName,
      lastName: this.addEmployeeForm.value.lastName,
      email: this.addEmployeeForm.value.email,
      mobileNo: this.addEmployeeForm.value.mobile,
      company: this.addEmployeeForm.value.company,
      address: this.addEmployeeForm.value.address,
      dateOfBirth: this.dateChanged ?
        Date.UTC(this.addEmployeeForm.value.dateOfBirth.getFullYear(),
          this.addEmployeeForm.value.dateOfBirth.getMonth(),
          this.addEmployeeForm.value.dateOfBirth.getDate())
        :
        this.addEmployeeForm.value.dateOfBirth,
      type: 'employee'
    }

    this.apiService.request('CREATE_USER', { data }).subscribe((result) => {
      if (result.success) {
        this.toastService.activate('Successfully!')
        this.dialogRef.close();
      }
    })
  }

  update() {
    let data = {
      id: this.employee.id,
      firstName: this.addEmployeeForm.value.firstName,
      lastName: this.addEmployeeForm.value.lastName,
      email: this.addEmployeeForm.value.email,
      mobileNo: this.addEmployeeForm.value.mobile,
      company: this.addEmployeeForm.value.company,
      address: this.addEmployeeForm.value.address,
      dateOfBirth: this.dateChanged ?
      Date.UTC(this.addEmployeeForm.value.dateOfBirth.getFullYear(),
        this.addEmployeeForm.value.dateOfBirth.getMonth(),
        this.addEmployeeForm.value.dateOfBirth.getDate())
      :
      this.addEmployeeForm.value.dateOfBirth,
      type: 'employee'
    }

    this.apiService.request('UPDATE_EMPLOYEE', { data }).subscribe((result) => {
      if (result.success) {
        this.toastService.activate('Successfully!')
        this.dialogRef.close();
      }
    })
  }

}
