import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  constructor(private http: HttpClient) { }

  API_URI = 'https://sivilayasociados.netlify.app/api';


  getPosts() {
    return this.http.get(`${this.API_URI}/posts`);
  }

  getPost(id: string) {
    return this.http.get(`${this.API_URI}/posts/${id}`);
  }

  deletePost(id: string) {



    return this.http.delete(`${this.API_URI}/posts/${id}`, { responseType: 'text'});
  }

  savePosts(item: any) {
    return this.http.post(`${this.API_URI}/posts`, item, { responseType: 'text'});
  }


  updatePosts(id: string | number, updateditem: any): Observable<any> {
    return this.http.put(`${this.API_URI}/posts/${id}`, updateditem);
  }

}

function CrossOrigin(arg0: string) {
  throw new Error('Function not implemented.');
}