import { Component, OnInit } from '@angular/core';
import { Savel } from 'src/app/models/savel';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
      this.getLeaves();
  
  }

  name: string = "";
  state: string = 'Select State';
  country: string = 'Select Country';
  organizationPic: File | null = null;

  states: string[] = []; 

  countries = [
    {
      name: 'India',
      states: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']
    },  
    {
      name: 'Australia',
      states: ['New South Wales', 'Victoria', 'Queensland']
    },
    {
      name: 'Canada',
      states: ['Ontario', 'Quebec', 'British Columbia']
    },
    {
      name: 'United States',
      states: ['California', 'New York', 'Texas']
    },
    {
      name: 'India',
      states: ['Maharashtra', 'Tamil Nadu', 'Uttar Pradesh']
    },
    {
      name: 'Germany',
      states: ['Bavaria', 'North Rhine-Westphalia', 'Baden-Württemberg']
    },
    {
      name: 'Brazil',
      states: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais']
    },
    {
      name: 'China',
      states: ['Guangdong', 'Shandong', 'Zhejiang']
    },
    {
      name: 'Russia',
      states: ['Moscow', 'Saint Petersburg', 'Sverdlovsk']
    },
    {
      name: 'South Africa',
      states: ['Gauteng', 'KwaZulu-Natal', 'Western Cape']
    },
    {
      name: 'Argentina',
      states: ['Buenos Aires', 'Córdoba', 'Santa Fe']
    },
    {
      name: 'France',
      states: ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Provence-Alpes-Côte d']
    },
    {
      name: 'Japan',
      states: ['Tokyo', 'Osaka', 'Kanagawa']
    },
    {
      name: 'Mexico',
      states: ['Mexico City', 'Jalisco', 'Nuevo León']
    },
    {
      name: 'Spain',
      states: ['Madrid', 'Catalonia', 'Andalusia']
    },
    {
      name: 'Italy',
      states: ['Lombardy', 'Lazio', 'Veneto']
    },
    {
      name: 'United Kingdom',
      states: ['England', 'Scotland', 'Wales']
    },
    {
      name: 'Saudi Arabia',
      states: ['Riyadh', 'Makkah', 'Eastern Province']
    },
    {
      name: 'Egypt',
      states: ['Cairo', 'Giza', 'Alexandria']
    },
    {
      name: 'Thailand',
      states: ['Bangkok', 'Phuket', 'Chiang Mai']
    },
    {
      name: 'Nigeria',
      states: ['Lagos', 'Kano', 'Abuja']
    },  
  ];
  
  updateStates() {
    const selectedCountry = this.countries.find(c => c.name === this.country);
    if (selectedCountry) {
      this.states = selectedCountry.states;
    } else {
      this.states = [];
    }
    this.state = 'Select State'; 
  }


  register() {
    this.dataService.registerOnboardingDetails(this.name, this.state, this.country, this.organizationPic).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Organization Registered successfully");
    });
  }

  loginArray: any = {
    inTime: '',
    outTime: '',
    startLunch: '',
    endLunch: '',
    workingHour: '',
    totalHour: '',
  };
  
  calculateHours() {
    const inTimeParts = this.loginArray.inTime.split(':');
    const outTimeParts = this.loginArray.outTime.split(':');
    const startLunchParts = this.loginArray.startLunch.split(':');
    const endLunchParts = this.loginArray.endLunch.split(':');
  
    const inHours = parseInt(inTimeParts[0]);
    const inMinutes = parseInt(inTimeParts[1]);
    const outHours = parseInt(outTimeParts[0]);
    const outMinutes = parseInt(outTimeParts[1]);
    const startLunchHours = parseInt(startLunchParts[0]);
    const startLunchMinutes = parseInt(startLunchParts[1]);
    const endLunchHours = parseInt(endLunchParts[0]);
    const endLunchMinutes = parseInt(endLunchParts[1]);
  
    let inTime = inHours * 60 + inMinutes;
    let outTime = outHours * 60 + outMinutes;
    let startLunchTime = startLunchHours * 60 + startLunchMinutes;
    let endLunchTime = endLunchHours * 60 + endLunchMinutes;
  
    if (outTime < inTime) {
      outTime += 24 * 60; // Add 24 hours to outTime to account for the next day
    }
  
    const workingMinutes = (outTime - inTime) - (endLunchTime - startLunchTime);
    const totalMinutes = (outTime - inTime);
  
    const workingHours = Math.floor(workingMinutes / 60);
    const workingMinutesRemainder = workingMinutes % 60;
    console.log(workingMinutesRemainder);
  
    const totalHours = Math.floor(totalMinutes / 60);
    const totalMinutesRemainder = totalMinutes % 60;
    console.log(totalMinutesRemainder);
  
    this.loginArray.workingHour = `${workingHours}:${workingMinutesRemainder}`;
    this.loginArray.totalHour = `${totalHours}:${totalMinutesRemainder}`;
  }
  
  addShift() {
    this.calculateHours();
    console.log(this.loginArray);
    alert("Shift Time updated");
  }
  

  leaveData = {
    leaveType: '',
    leaveEntitled: '',
    leaveStatus: ''
  };

  onSubmit() {
    this.dataService.saveLeave(this.leaveData).subscribe(
      (response) => {
        console.log(response);
        alert("Leave saved successfully");

      },
      (error) => {
        console.error(error);
        alert("Error saving leave");
      }
    );
  }

  savel: Savel[] = [];

  getLeaves() {
    this.dataService.getLeave().subscribe(data => {
      this.savel = data;
      console.log(this.savel);
    }, (error) => {
      console.log(error);
    })
  }

  updateLeaveStatus(sav: Savel) {
    this.dataService.updateLeaveStatus(sav).subscribe(() => {
      console.log(`Leave status updated for ${sav.leaveType}`);
      alert("Leave status updated");
    
    }, (error) => {
      console.log(error);
    });
  }
}
