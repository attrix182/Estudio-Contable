import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewPostService {

  public selectedPost: any ='';

  constructor() { }

  selectPost(post: any) {
    this.selectedPost = post;
  }

  
  getPost() {
    return this.selectedPost;
  }

}
