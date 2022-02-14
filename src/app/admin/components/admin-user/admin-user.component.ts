import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminUserService } from 'app/admin/services/admin-user.service';
import { UserInfor } from 'shared/models/user';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent  {

  displayedColumns: string[] = ['email', 'displayName', 'isAdmin', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  
  users!: MatTableDataSource<UserInfor>;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private userService: AdminUserService, private _snackBar: MatSnackBar,) { 
    this.userService.getAllUsers()
    .subscribe(data => {
      this.users = new MatTableDataSource(data);
      this.users.sort = this.sort;
    })
  }
  acceptUser(user: UserInfor){
    this.userService.verifyUser(user).subscribe(()=>{
      this._snackBar.open('Verify User', 'OK', {
        duration: 1000
      })
      window.location.reload();
    })
  }
}
