import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService} from '../shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  constructor(private fb: FormBuilder, 
              private auth:AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.loginForm = this.fb.group({
      email:['', [Validators.required,
                  Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]], // Pattern is added from regexemail.com
      password:['', Validators.required]
    })
  }
  isInvalidForm(fieldName): boolean{
    return this.loginForm.controls[fieldName].invalid &&
           (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched)
  }
  isRequired(fieldName): boolean{
    return this.loginForm.controls[fieldName].errors.required
  }
  login(){
        this.auth.login(this.loginForm.value).subscribe(
          (token) => {
            debugger;
            this.router.navigate(['/rentals']);  // Just adding path to our URL for register
          },
          (errorResponse) => {
            this.errors = errorResponse.error.errors;
          })
  }
}
