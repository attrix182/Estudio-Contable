import { AlertService } from './../../services/alert.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { FireService } from 'src/app/services/fire.service';

import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';
import { BaseFormAbstract } from 'src/app/shared/base-form-abstract';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent extends BaseFormAbstract implements OnInit {
  @ViewChild('modalPost', { read: TemplateRef })
  modalPost: TemplateRef<any>;

  filePath: string;
  formGroup: FormGroup;
  photo: File;
  selectPhoto: boolean = true;
  postFinal: any;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  public user: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private FB: FormBuilder,
    private AlertService: AlertService,
    private fire: FireService,
    private imageCompress: NgxImageCompressService
  ) {
    super();

    this.user = this.getActiveUser();
  }

  ngOnInit(): void {
    this.initForm();
  }

  getActiveUser() {
    return this.authService.isLogged;
  }

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.photo = (e.target as HTMLInputElement).files[0];

    this.formGroup.patchValue({
      img: file,
    });

    this.formGroup.get('img').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  writePost() {
    this.modalService.open(this.modalPost);
  }

  addPost() {
    var date = new Date();
    this.formGroup.value.fecha = date.getTime();
    this.postFinal = this.formGroup.value;
    this.postFinal.img = this.imgResultAfterCompress.split(/,(.+)/)[1];
    this.fire.InsertPost('posts', this.postFinal);
    //clear form post
    this.formGroup.reset();
    this.filePath = null;
    this.modalService.dismissAll();
    this.AlertService.alertTop('success', 'Post agregado con exito');
  }

  logOut() {
    this.authService.LogOutCurrentUser();
    this.router.navigateByUrl('/');
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imgResultBeforeCompress = image;
      /* console.warn('Size in bytes was:', this.imageCompress.byteCount(image)); */
      this.imageCompress
        .compressFile(image, orientation, 50, 40)
        .then((result) => {
          this.imgResultAfterCompress = result;
          this.selectPhoto = false;
        });
    });
  }

  setErrorMessages() {
    this.errroMessages = {
      title: {
        required: 'El titulo es obligatorio',
      },
      subtitle: {
        required: 'El subtitulo es obligatorio',
      },
      content: {
        required: 'El contenido es obligatorio',
      },
    };
  }

  initForm() {
    this.formGroup = new FormGroup({
      title: new FormControl(''),
      subtitle: new FormControl(''),
      content: new FormControl(''),
      img: new FormControl(''),
    });

    this.formGroup = this.FB.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      content: ['', Validators.required],
      img: [null],
      filename: [''],
    });
  }
}
