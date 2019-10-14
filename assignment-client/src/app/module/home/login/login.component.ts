import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastService: ToastService,
    private userService: UserService) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required])
    });

  }

  login(){
    let data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
this.apiService.request('LOGIN',{data}).subscribe(res => {
  console.log(res);
  if(res.success){
    this.userService.setLoggedInUser(res.data);
    this.router.navigate(['/dashboard']);
  } else {
    this.toastService.activate('Invalid credentials!')
  }
  
})
  }
}
