
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { ViewPostService } from 'src/app/services/view-post.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {


  public posts: any = [];
  public postsAux: any = [];
  public result: any[] = [];

  @Output() selectedPost: EventEmitter<any> = new EventEmitter<any>();

  constructor(private postService: PostsService, private viewPostService: ViewPostService, private router: Router) { }

  ngOnInit(): void {
    this.getPosts()
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

  selectPost(post) {
    this.viewPostService.selectPost(post);
    this.router.navigateByUrl("/post")
  }

}
