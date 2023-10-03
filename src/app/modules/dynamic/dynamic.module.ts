import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicRoutingModule } from './dynamic-routing.module';
import { DynamicComponent } from './dynamic.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from '../common/header/header.component';
import { TopbarComponent } from '../common/topbar/topbar.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { ProjectComponent } from './components/project/project.component';
import { TaskManagerComponent } from './components/task-manager/task-manager.component';
import { LiveManagerComponent } from './components/live-manager/live-manager.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DynamicComponent,
    DashboardComponent,
    HeaderComponent,
    TopbarComponent,
    TimetableComponent,
    ProjectComponent,
    TaskManagerComponent,
    LiveManagerComponent,
    OnboardingComponent,
    LoginComponent,
    PaymentComponent,
    UserlistComponent
  ],
  imports: [
    DynamicRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class DynamicModule { }