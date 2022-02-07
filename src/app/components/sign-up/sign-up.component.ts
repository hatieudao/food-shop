import { UserService } from "./../../services/user.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { passwordsMatchValidator } from "./confirm-password.validators";
import { FirebaseService } from "src/app/services/firebase.service";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { switchMap } from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  formSignUp = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    role: new FormControl('staff', [Validators.required]),
  },
  {validators: passwordsMatchValidator()})
  constructor(
    private authService: FirebaseService,
    private router: Router,
    private toast: HotToastService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }
  get email(){
    return this.formSignUp.get('email');
  }
  get password(){
    return this.formSignUp.get('password');
  }
  get confirmPassword(){
    return this.formSignUp.get('confirmPassword');
  }
  get name(){
    return this.formSignUp.get('name');
  }
  submit(){
    if (!this.formSignUp.valid) {
      return;
    }

    const { name, email, password } = this.formSignUp.value;
    this.authService
      .signUp(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.userService.addUser({ uid, email, displayName: name, isAdmin: false })
        ),
        this.toast.observe({
          success: 'Congrats! You are all signed up',
          loading: 'Signing up...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}