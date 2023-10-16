import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-slack-auth',
  templateUrl: './slack-auth.component.html',
  styleUrls: ['./slack-auth.component.css'],
})
export class SlackAuthComponent implements OnInit{
  codeParam : string | null = null;
  orgId : any;
  // ide !:number;
  //  @Input() getIdFromOboard : any;
  constructor(private dataService : DataService, private httpClient : HttpClient){}
  ngOnInit(): void {
    debugger
    // this.dataService.getOrgIdEmitter().subscribe((orgId) => {
    //   console.log('Org ID received in SlackAuthComponent:', orgId);
    //   this.orgId = orgId;
    //   this.saveToken(this.orgId);
    // });
    
    if (localStorage.getItem('orgId') != undefined && localStorage.getItem('orgId') != null && localStorage.getItem('orgId') != '') {
      this.orgId = localStorage.getItem('orgId');
      // this.dataService.orgId = this.id;
    }

    // const cookieValue = this.cookieService.get('orgId');
    // this.orgId = parseInt(cookieValue);
    this.saveToken(this.orgId);
  }
  
  saveToken(orgID : number): void {
    this.codeParam = new URLSearchParams(window.location.search).get('code');
    if (!this.codeParam) {
      alert('Invalid URL: Missing code parameter');
      return;
    }
   
    // console.log(this.orgId);
    
    if (!this.orgId) {
      alert('Organization ID not found');
      return;
    }
    debugger
     this.dataService.saveTokenForOrganization(this.codeParam.toString(), this.orgId)
    .subscribe(
      (response) => {
        console.log('Token saved:', response);

      },
      (error) => {
        console.error('Error saving token:', error);
      }
    );
  }
}
