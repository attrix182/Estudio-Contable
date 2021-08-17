import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {


  public posts: any = [];
  public postsAux: any = [];
  public searchParam: string = "";
  public result: any[] = [];

  constructor(private postService: PostsService) { }

  ngOnInit(): void {

    this.getPosts()
    console.log(this.posts)
  }

  getPosts() {

    this.postService.getPosts()
      .subscribe(
        res => {
          this.posts.splice(0, this.posts.length)
          this.posts.push(res);
          this.postsAux = this.posts
        },
        err => console.error('no results')
      );
  }

}
