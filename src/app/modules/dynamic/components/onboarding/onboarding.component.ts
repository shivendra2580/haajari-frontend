import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Savel } from 'src/app/models/savel';
import { Organization } from 'src/app/models/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {

  businessInfoForm: FormGroup;
  shiftTimingsForm: FormGroup;
  //leavesSettingForm: FormGroup;
  // private modalService: NgbModal,

  constructor(private dataService: DataService, private router: Router, private fb: FormBuilder ) { 
      this.businessInfoForm = this.fb.group({
        name: ['', Validators.required],
        country: ['', Validators.required],
        state: ['', Validators.required],
        organizationPic: [null, Validators.required],
      });
  
      this.shiftTimingsForm = this.fb.group({
        inTime: ['', Validators.required],
        outTime: ['', Validators.required],
        startLunch: ['', Validators.required],
        endLunch: ['', Validators.required]
      });
  
      // this.leavesSettingForm = this.fb.group({
      //   leaveType: ['', Validators.required],
      //   leaveEntitled: ['', Validators.required],
      //   leaveStatus: ['', Validators.required]
      // });  
  }

  ngOnInit(): void {
      this.getLeaves();
  }


  name: string = "";
  state: string = '';
  country: string = '';
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
 
  
  resetForm2() {
    this.name= '';
    this.state = '';
    this.country = '';
    this.organizationPic = null;
  }
 

  register() {
    if (this.businessInfoForm.valid) {
    this.dataService.registerOnboardingDetails(this.name, this.state, this.country, this.organizationPic).subscribe((resultData: any) => {
      console.log(resultData);
     this.loginArray.organizationId=resultData.id;
     this.leaveData.orgId=resultData.id;

     // alert("Organization Registered successfully, Please Click on Shift Timings");
      this.resetForm2();
      //window.location.reload();
    });
    }
  }

  loginArray: {
    inTime: string,
    outTime: string,
    startLunch: string,
    endLunch: string,
    workingHour: string,
    totalHour: string,
    organizationId: number,
  } = {
    inTime: "",
    outTime: "",
    startLunch: "",
    endLunch: "",
    workingHour: "",
    totalHour: "",
    organizationId: 0,
  
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
    if (this.shiftTimingsForm.valid) {
    this.calculateHours();
    console.log(this.loginArray);
    const result2=document.getElementById("abc") as HTMLElement | null;
     if(result2){
       result2.style.display="none";
     }
    // alert("Shift Time updated");

    const result=document.getElementById("xyz") as HTMLElement | null;
     if(result){
      result.style.display="block";
     }
    }
    
  }
  
  
  leaveData = {
    leaveType: '',
    leaveEntitled: '',
    leaveStatus: '',
    orgId: 0
  };

  resetForm() {
    this.leaveData = {
      leaveType: '',
      leaveEntitled: '',
      leaveStatus: '',
      orgId: this.leaveData.orgId
    };
  }

  @ViewChild('leaveSetForm') leaveSetForm!:any;
  @ViewChild('requestLeaveCloseModel') requestLeaveCloseModel!: ElementRef;
  

  // closePopup() {
  //   this.modalService.dismissAll(); 
  // }

  leaveSetInvalidToggle:boolean = false;
  //IsmodelShow=false;

  // close() {
  //   this.IsmodelShow=true;// set false while you need open your model popup
  // }

  setAct(){
    if(this.leaveSetForm.valid){
    // this.leaveSetForm.dismissAll;
    // this.closePopup();
     this.setActive(4);
    }
  }
  onSubmit() {
    debugger
    if(this.leaveSetForm.invalid){
      this.leaveSetInvalidToggle = true;
      return;
    }
    //if (this.leavesSettingForm.valid) {
    this.dataService.saveLeave(this.leaveData).subscribe(
      (response) => {
        console.log(response);
        this.savel.push(response);
        const result2=document.getElementById("cba") as HTMLElement | null;
        if(result2){
             result2.style.display="none";
         }
        const result=document.getElementById("zyx") as HTMLElement | null;
        if(result){
            result.style.display="block";
        }
        this.requestLeaveCloseModel.nativeElement.click();
        // alert("Leave saved successfully");
        this.resetForm();
       // window.location.reload();
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
      // if(this.savel==null){
      //   this.count=this.count-1;
      // }
      console.log(this.savel);
    }, (error) => {
      console.log(error);
    })
  }

  updateLeaveStatus(sav: Savel) {
    this.dataService.updateLeaveStatus(sav).subscribe(() => {
      console.log(`Leave status updated for ${sav.leaveType}`);
     // alert("Leave status updated");
    
    }, (error) => {
      console.log(error);
    });
  }

  currentDate = new Date();

  activeModel:number=0;
  count:number=0;
  setActive(activeNumber:number){
    this.count=this.count+1;
    this.activeModel = activeNumber;
    console.log(this.activeModel, this.count);
  }

  // resetForm3() {
  //   this.loginArray = {
  //     inTime: "",
  //     outTime: "",
  //     startLunch: "",
  //     endLunch: "",
  //     workingHour: "",
  //     totalHour: "",
  //     organizationId: this.loginArray.organizationId,
  //   };
  // }

  onSaveShiftTimings() {
    this.dataService.saveShiftTimings(this.loginArray).subscribe(
      (response) => {
        console.log(response);
       // alert("Shift Time saved successfully, Click on Leaves Setting");
       // this.resetForm3();
        // const result4=document.getElementById("xyz") as HTMLElement | null;
        // if(result4){
        //   result4.style.display="none";
        //  }

        //  const result5=document.getElementById("def") as HTMLElement | null;
        // if(result5){
        //   result5.style.display="block";
        //  }
      },
      (error) => {
        console.error(error);
        alert("Error saving leave");
      }
    );
  }

  onBtnClick(){

    if(this.count>=3){
       this.router.navigate(['/dynamic/addtoslack']);
    }
  }

  businessInfoCompleted: boolean = false;
  shiftTimingsCompleted: boolean = false;
  lockbusinessInfoCompleted: boolean = true;

  setBusinessInfoCompleted() {
    this.businessInfoCompleted = true;
  }
  setShiftTimingsCompleted() {
    this.shiftTimingsCompleted = true;
  }
  setLockbusinessInfoCompleted() {
    this.lockbusinessInfoCompleted = false;
  }

  

}
