import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.signUpForm = this.formBuilder.group({
      firstName: this.formBuilder.control(null, Validators.required),
      lastName: this.formBuilder.control(null, Validators.required),
      email: this.formBuilder.control(null, Validators.required),
      mobile: this.formBuilder.control(null, Validators.required),
      password: this.formBuilder.control(null, Validators.required),
      confirmPassword: this.formBuilder.control(null, Validators.required),
      address: this.formBuilder.control(null, Validators.required),
    });
  }

}
