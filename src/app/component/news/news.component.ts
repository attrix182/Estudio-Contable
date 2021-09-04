
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { ViewPostService } from 'src/app/services/view-post.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {


  public posts: any = [];
  public postsAux: any = [];
  public result: any[] = [];
  
  public showPost: any = "";

  @Output() selectedPost: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modalPost', { read: TemplateRef })
  modalPost: TemplateRef<any>;

  constructor(private postService: PostsService, private viewPostService: ViewPostService, private router: Router,
    private modalService: NgbModal,private vref: ViewContainerRef) { }

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

  abrirModalPost(post) {
    this.showPost = post
    this.modalService.open(this.modalPost)
  }

}
