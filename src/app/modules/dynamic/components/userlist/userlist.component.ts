import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(private dataService : DataService) { }

  users : Users[] = [];
  itemPerPage : number = 120;
  pageNumber : number = 1;

  ngOnInit(): void {
    this.getUsersByFiltersFuntion();
  }

  getUsersByFiltersFuntion() {
    this.dataService.getUsersByFilter(this.itemPerPage,this.pageNumber).subscribe(data => {
      this.users = data;
      console.log(this.users);
    }, (error) => {
      console.log(error);
    })
  }

}
