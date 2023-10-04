import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = "http://localhost:8080/api/v1/attendance";

  openSidebar:boolean=true;

  getUsersByFilter(itemPerPage: number, pageNumber: number) : Observable<any>{
    const params = new HttpParams()
    .set("itemPerPage", itemPerPage.toString())
    .set("pageNumber", pageNumber.toString())
    .set('sortOrder', 'asc')
    .set('sortBy', 'id')
    .set('search', '')
    .set('searchBy', 'name');

    return this.httpClient.get<any>(`${this.baseUrl}/users/by-filters`, {params});
  }


  registerOnboardingDetails(name: string, state: string, country: string, organizationPic: File | null) {
    const params = new HttpParams()
      .set('name', name)
      .set('state', state)
      .set('country', country);

    const url = `http://localhost:8080/api/v1/attendance/registerOrg?${params.toString()}`;

    return this.httpClient.post(url, organizationPic);
  }

  changeStatusById(id: number, name: string) : Observable<any>{
    const params = new HttpParams()
    .set('id', id.toString())
    .set('name', name);

    return this.httpClient.put<any>(`${this.baseUrl}/change-status`, params);
  }
}









