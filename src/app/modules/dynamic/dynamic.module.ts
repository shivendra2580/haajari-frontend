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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SlackAuthComponent } from './components/slack-auth/slack-auth.component';
import { AddToSlackComponent } from './components/add-to-slack/add-to-slack.component';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import { DateFormatPipe } from './date-format.pipe';
import { TimeFormatPipe } from './time-format.pipe';
import { DurationFormatPipe } from './duration-format.pipe';

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
    UserlistComponent,
    SlackAuthComponent,
    AddToSlackComponent,
    DateFormatPipe,
    TimeFormatPipe,
    DurationFormatPipe,

  ],
  imports: [
    DynamicRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxDaterangepickerMd.forRoot()
  ]
})
export class DynamicModule { }
