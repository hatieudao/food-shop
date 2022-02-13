import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent  {

 displayedColumns: string[] = ['photo', 'title', 'price', 'category','description', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  constructor() { 
    
    }
}
