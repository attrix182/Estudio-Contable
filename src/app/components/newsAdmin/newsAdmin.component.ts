import { AlertService } from './../../services/alert.service';

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { FireService } from 'src/app/services/fire.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-news-admin',
  templateUrl: './newsAdmin.component.html',
  styleUrls: ['./newsAdmin.component.css'],
})
export class NewsAdminComponent implements OnInit {
  public test: number = 3;
  public posts: any = [];
  public postsAux: any = [];
  public result: any[] = [];

  public showPost: any = '';

  post: FormGroup;
  filePath: string;
  photo: File;
  seleccionoFoto: boolean = true;
  postFinal: any;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  @Output() selectedPost: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('modalPost', { read: TemplateRef })
  modalPost: TemplateRef<any>;

  @ViewChild('modalPostEdit', { read: TemplateRef })
  modalPostEdit: TemplateRef<any>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private FB: FormBuilder,
    private alertSvc: AlertService,
    private fire: FireService,
    private imageCompress: NgxImageCompressService
  ) {
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
    });

    this.post = new FormGroup({
      titulo: new FormControl(''),
      subtitulo: new FormControl(''),
      contenido: new FormControl(''),
    });

    this.post = this.FB.group({
      titulo: ['', Validators.required],
      subtitulo: ['', Validators.required],
      contenido: ['', Validators.required],
      img: [null],
      filename: [''],
    });
  }

  ngOnInit(): void {}

  //Formatea la fecha de los posts a un formato legible
  formatDate() {
    this.postsAux = this.posts.forEach((element) => {
      element.fecha = new Date(element.fecha)
        .toLocaleDateString()
        .concat(' a las ', new Date(element.fecha).toLocaleTimeString());
    });
  }



  abrirModalPost(post) {
    this.showPost = post;
    this.modalService.open(this.modalPost);
  }

  async deletePost(post) {
    let confirm: any = false;
    confirm = await this.alertSvc.confirmAlert();
    if (confirm) {
      this.fire.Delete('posts', post.id).then(() => {
        this.modalService.dismissAll();
        this.alertSvc.alertCenter('info', 'El post ha sido eliminado');
      });
    }
  }

  editPost(post) {
    this.modalService.dismissAll();

    // this.imgResultAfterCompress = post.img;

    this.post.controls.titulo.setValue(post.titulo);
    this.post.controls.subtitulo.setValue(post.subtitulo);
    this.post.controls.contenido.setValue(post.contenido);

    this.modalService.open(this.modalPostEdit);
  }

  updatePost() {
    this.postFinal = this.post.value;

    this.fire.UpdatePost(this.showPost.id, 'posts', this.postFinal);

    this.post.reset();
    this.filePath = null;
    this.modalService.dismissAll();
    this.alertSvc.alertTop('success', 'Post agregado con exito');
  }

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.photo = (e.target as HTMLInputElement).files[0];

    this.post.patchValue({
      img: file,
    });

    this.post.get('img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  cancel() {
    this.modalService.dismissAll();
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imgResultBeforeCompress = image;
      /* console.warn('Size in bytes was:', this.imageCompress.byteCount(image)); */
      this.imageCompress
        .compressFile(image, orientation, 50, 40)
        .then((result) => {
          /* console.log(result); */
          this.imgResultAfterCompress = result;
          this.seleccionoFoto = false;
          /* console.warn('Size in bytes is now:', this.imageCompress.byteCount(result)); */
        });
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

}
