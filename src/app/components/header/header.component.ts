import { UserService } from "./../../services/user.service";
import { Observable } from "rxjs";
import { FirebaseService } from "src/app/services/firebase.service";
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { UserInfor } from "src/app/models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;
  currentUser$ : Observable<UserInfor | null> =  this.userService.currentUserProfile$;
  constructor(private userService: UserService, private authService: FirebaseService) {
   }

  ngOnInit(): void {
  }
  

  someMethod() {
    this.trigger.openMenu();
  }
  logout(){
    this.authService.logout();
  }
}
