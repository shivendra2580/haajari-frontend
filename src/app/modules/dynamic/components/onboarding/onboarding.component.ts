import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  name: string = "";
  state: string = "";
  country: string = "";
  organizationPic: File | null = null;

  register() {
    this.dataService.registerOnboardingDetails(this.name, this.state, this.country, this.organizationPic).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Organization Registered successfully");
    });
  }
}