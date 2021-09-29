import { AlertService } from './../../services/alert.service';

import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, ViewContainerRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-news-admin',
  templateUrl: './newsAdmin.component.html',
  styleUrls: ['./newsAdmin.component.css']
})
export class NewsAdminComponent implements OnInit {

  public test: number = 3;
  public posts: any = [];
  public postsAux: any = [];
  public result: any[] = [];

  public showPost: any = "";


  @Output() selectedPost: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modalPost', { read: TemplateRef })
  modalPost: TemplateRef<any>;

  constructor(private fire: FireService, private router: Router,
    private modalService: NgbModal, private vref: ViewContainerRef, private auth: AuthService, private alertSvc: AlertService) {
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
      this.posts = data

      this.formatDate();
      this.orderPostsByDate();

      console.log(this.posts);
    });


  }


  ngOnInit(): void { }

  //Formatea la fecha de los posts a un formato legible
  formatDate() {
    this.postsAux = this.posts.forEach(element => {
      element.fecha = new Date(element.fecha).toLocaleDateString().concat(' a las ', new Date(element.fecha).toLocaleTimeString());
    });
  }

  //Ordena los posts por fecha de mas actual a mas antiguo
  orderPostsByDate() {
    this.posts.sort((a, b) => {
      if (a.fecha > b.fecha) {
        return -1;
      }
      if (a.fecha < b.fecha) {
        return 1;
      }
      return 0;
    });

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


  abrirModalPost(post) {
    this.showPost = post
    this.modalService.open(this.modalPost)
  }

  deletePost(post) {
    let confirm:any = false;


    confirm = this.alertSvc.confirmAlert();
    console.log(confirm)
    
    if (confirm) {
      this.fire.Delete('posts', post.id).then(() => {
        this.modalService.dismissAll();
        this.alertSvc.alertCenter('info', 'El post ha sido eliminado')
      });
    }
  }

  editPost(post) {
    console.log(post.id)
    this.alertSvc.alertCenter('info', 'Aun no implementado')
  }



}
