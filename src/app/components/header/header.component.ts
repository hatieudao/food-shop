import { Router } from "@angular/router";
import { UserService } from "shared/services/user.service";
import { Observable } from "rxjs";
import { AuthService } from "shared/services/auth.service";
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { UserInfor } from "shared/models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;
  currentUser$ : Observable<UserInfor | null> =  this.userService.currentUserProfile$;
  constructor(
    private userService: UserService, 
    private authService: AuthService,
    private router: Router) {
   }

  ngOnInit(): void {
  }
  

  someMethod() {
    this.trigger.openMenu();
  }
  logout(){
    this.authService
    .logout()
    .subscribe(() => this.router.navigate(['/login']));
  }
}
