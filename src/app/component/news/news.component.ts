
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, ViewContainerRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { ViewPostService } from 'src/app/services/view-post.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public test: number = 3;
  public posts: any = [];
  public postsAux: any = [];
  public result: any[] = [];

  public showPost: any = "";

  @Output() selectedPost: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modalPost', { read: TemplateRef })
  modalPost: TemplateRef<any>;

  constructor(private fire: FireService, private viewPostService: ViewPostService, private router: Router,
    private modalService: NgbModal, private vref: ViewContainerRef) {
    if (window.screen.width > 200) {
      this.test = 1;
    }
    if (window.screen.width > 600) {
      this.test = 2;
    }
    if (window.screen.width > 900) {
      this.test = 3;
    }


    this.fire.GetAll('posts').subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    });

  }

  ngOnInit(): void {

  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth > 200) {
      this.test = 1;
    }
    if (event.target.innerWidth > 600) {
      this.test = 2;
    }
    if (event.target.innerWidth > 900) {
      this.test = 3;
    }
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
