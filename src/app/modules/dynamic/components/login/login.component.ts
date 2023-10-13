import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email: any;
password: any;

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
  }

  signIn(){
    this.dataService.signInOrganization(this.email,this.password).subscribe(data =>{
      console.log(data);
    }, (error) =>{
      console.log(error);
    })
  }

  signInWithEmail(){

    const res = document.getElementById("mt-5") as HTMLElement | null;
    if(res){
      res.style.display="none";
    }

    const res2 = document.getElementById("signin-with-email") as HTMLElement | null;
    if(res2){
      res2.style.display="block";
    }
  }

}
