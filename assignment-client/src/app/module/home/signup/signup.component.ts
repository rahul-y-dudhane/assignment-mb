import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchingPasswords } from 'src/app/core/shared/util/app-validators';
// import { UserService } from 'src/app/core/services/user/user.service';
import { ApiService } from '../../../core/services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private router: Router,
              private route: ActivatedRoute,
              private toastService: ToastService) { }

  ngOnInit() {

    this.signUpForm = this.formBuilder.group({
      firstName: this.formBuilder.control(null, Validators.required),
      lastName: this.formBuilder.control(null, Validators.required),
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      dateOfBirth: this.formBuilder.control(null, Validators.required),
      mobile: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^[789]\d{9}$/)]),
      password: this.formBuilder.control(null, [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]),
      confirmPassword: this.formBuilder.control(null, [Validators.required, Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)]),
      address: this.formBuilder.control(null, Validators.required),
    }, { validator: matchingPasswords('password', 'confirmPassword') });
  }

  signUp() {
    let data = {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      email: this.signUpForm.value.email,
      mobileNo: this.signUpForm.value.mobile,
      password: this.signUpForm.value.confirmPassword,
      address: this.signUpForm.value.address,
      dateOfBirth: Date.UTC(this.signUpForm.value.dateOfBirth.getFullYear(),
                            this.signUpForm.value.dateOfBirth.getMonth(), 
                            this.signUpForm.value.dateOfBirth.getDate()),
      type:'manager'
    }

    this.apiService.request('CREATE_USER',{data}).subscribe((result)=> {
      if(result.success){
        this.toastService.activate('Successfully! Please login to proceed further.')
        this.router.navigate(['./login'],{relativeTo:this.route});
      }
    })
    
  }

}
