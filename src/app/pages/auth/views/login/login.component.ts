import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm:FormGroup;
  get email() { return this.loginForm.get('email'); }
  get pass() { return this.loginForm.get('pass'); }
  
  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  public signInWithGoogle(){
    return this.authSvc.signInWithGoogle()
  }

  private buildForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

}
