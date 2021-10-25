import {
  Component,
  OnInit, 
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  public test: number = 2;
  public posts: any = [];
  public postsAux: any = [];
  public result: any[] = [];

  public showPost: any = '';

  @Output() selectedPost: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modalPost', { read: TemplateRef })
  modalPost: TemplateRef<any>;

  constructor(
    private fire: FireService,
    private modalService: NgbModal,
  ) {
    if (window.screen.width > 200) {
      this.test = 1;
    }
    if (window.screen.width > 700) {
      this.test = 2;
    }
    if (window.screen.width > 1000) {
      this.test = 3;
    }

    this.fire.GetAll('posts').subscribe((data) => {
      this.posts = data;

      this.posts.sort((a, b) => {
        if (a.fecha > b.fecha) {
          console.log(a.fecha);
          return -1;
        }
        if (a.fecha < b.fecha) {
          return 1;
        }
        return 0;
      });

      this.formatDate();

    });


  }

  formatDate() {
    this.postsAux = this.posts.forEach((element) => {
      element.fecha = new Date(element.fecha)
        .toLocaleDateString()
        .concat(' a las ', new Date(element.fecha).toLocaleTimeString());
    });
  }



  ngOnInit(): void {    console.log("aaaaaaaa");}

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

  abrirModalPost(post) {
    this.showPost = post;
    this.modalService.open(this.modalPost);
  }
}
