import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  constructor(private http: HttpClient) { }

  API_URI = 'https://apirestestudiocontable.herokuapp.com/api';


 

  registerUser(item: any) {
    return this.http.post(`${this.API_URI}/users/register`, item, { responseType: 'text'});
  }

 loginUser(item: any) {
   localStorage.setItem('token', 'true');
    return this.http.post(`${this.API_URI}/users/login`, item, { responseType: 'text'});
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }


  
}

function CrossOrigin(arg0: string) {
  throw new Error('Function not implemented.');
}
