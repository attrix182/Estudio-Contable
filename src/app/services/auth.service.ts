import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  constructor(private http: HttpClient) { }

  API_URI = 'https://apirestestudiocontable.herokuapp.com/api';


 

  registerUser(item: any) {
    return this.http.post(`${this.API_URI}/users/login`, item, { responseType: 'text'});
  }

 loginUser(item: any) {
    return this.http.post(`${this.API_URI}/users`, item, { responseType: 'text'});
  }




}

