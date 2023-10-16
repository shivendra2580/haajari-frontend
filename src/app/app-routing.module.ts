import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dynamic', loadChildren: () => import('./modules/dynamic/dynamic.module').then(m => m.DynamicModule) },
  {path: '', redirectTo: '/dynamic/onboarding', pathMatch:'full'}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
