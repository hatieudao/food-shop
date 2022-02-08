import { AuthService } from "shared/services/auth.service";
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toast: HotToastService
    ) { }

  ngOnInit(): void {
  }
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  submit(){
    if(!this.loginForm.valid){
      return;
    }
    const returnUrl = this.router.routerState.snapshot.root.queryParams?.['return'];
    localStorage.setItem('returnUrl', returnUrl || '/');
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).pipe(
      this.toast.observe({
        success: "Login successfully",
        loading: "Login ....",
        error: "There was an error"
      })
    ).subscribe(()=>{
      const returnUrl = localStorage.getItem('returnUrl') || '/';
      this.router.navigate([returnUrl]);
    });
  }
}
