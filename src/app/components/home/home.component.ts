import { UserService } from "shared/services/user.service";
import { AuthService } from "shared/services/auth.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$ = this.userService.currentUserProfile$;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  get user(){
    return this.user$;
  }
}
