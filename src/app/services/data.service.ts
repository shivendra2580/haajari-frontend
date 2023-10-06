import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { Time } from '@angular/common';
import { Savel } from '../models/savel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = "http://localhost:8080/api/v1/attendance";

  openSidebar:boolean=true;

  getUsersByFilter(itemPerPage: number, pageNumber: number, sort: string, sortBy: string, search: string, searchBy: string) : Observable<any>{
    const params = new HttpParams()
    .set("itemPerPage", itemPerPage.toString())
    .set("pageNumber", pageNumber.toString())
    .set('sortOrder', sort)
    .set('sortBy', sortBy)
    .set('search', search)
    .set('searchBy', searchBy);

    return this.httpClient.get<any>(`${this.baseUrl}/users/by-filters`, {params});
  }


  registerOnboardingDetails(name: string, state: string, country: string, organizationPic: File | null){
    const params = new HttpParams()
      .set('name', name)
      .set('state', state)
      .set('country', country)

    const url = `http://localhost:8080/api/v1/attendance/registerOrg?${params.toString()}`;

    return this.httpClient.post(url, organizationPic);
  }

  saveLeave(leaveData: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/save-leave`, leaveData);
}

  getLeave(): Observable<any> {
  return this.httpClient.get<Savel[]>(`${this.baseUrl}/get-leave`);
}

updateLeaveStatus(sav: Savel): Observable<any> {
  return this.httpClient.put(`${this.baseUrl}/update-leave-status/${sav.id}`, sav);
}

  changeStatusById(id: number, presenceStatus: Boolean) : Observable<any>{
    const params = new HttpParams()
    .set('id', id.toString())
    .set('presenceStatus', presenceStatus.toString());

    return this.httpClient.put<any>(`${this.baseUrl}/change-status`, params);
  }

}









