import { AlertService } from './../../services/alert.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { FireService } from 'src/app/services/fire.service';

import {DOC_ORIENTATION, NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {


  @ViewChild('modalPost', { read: TemplateRef })
  modalPost: TemplateRef<any>

  filePath: string;
  myForm: FormGroup;
  post: FormGroup;

  photo: File;
  seleccionoFoto:boolean=true;
  postFinal: any;

  imgResultBeforeCompress:string;

  imgResultAfterCompress:string;

  public user: any;

  constructor(public fb: FormBuilder, private authService: AuthService, private router: Router,
    private modalService: NgbModal, private FB: FormBuilder, private AlertService: AlertService, private fire: FireService,private imageCompress: NgxImageCompressService) {


    this.post = new FormGroup({
      'titulo': new FormControl(''),
      'subtitulo': new FormControl(''),
      'contenido': new FormControl('')

    });

    this.post = this.FB.group({

      'titulo': ['', Validators.required],
      'subtitulo': ['', Validators.required],
      'contenido': ['', Validators.required],
      img: [null],
      filename: ['']
    })

   this.user = this.getActiveUser();
  }


  ngOnInit(): void {}

getActiveUser()
{
  return this.authService.isLogged;
}


  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.photo = (e.target as HTMLInputElement).files[0];

    this.post.patchValue({
      img: file
    });

    this.post.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }



  writePost() {
    this.modalService.open(this.modalPost)
  }


  addPost() {
    var date = new Date();
    this.post.value.fecha = date.getTime();
    this.postFinal = this.post.value
    this.postFinal.img = this.imgResultAfterCompress.split(/,(.+)/)[1];
    this.fire.InsertPost('posts', this.postFinal);
    //clear form post
    this.post.reset();
    this.filePath = null;
    this.modalService.dismissAll();
    this.AlertService.alertTop('success', 'Post agregado con exito');
  }


  logOut() {
    
    this.authService.LogOutCurrentUser();
    this.router.navigateByUrl('/');
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      this.imgResultBeforeCompress = image;
      /* console.warn('Size in bytes was:', this.imageCompress.byteCount(image)); */
      this.imageCompress.compressFile(image, orientation, 50, 40).then(
        result => {
          /* console.log(result); */
          this.imgResultAfterCompress = result;
          this.seleccionoFoto=false;
          /* console.warn('Size in bytes is now:', this.imageCompress.byteCount(result)); */
        }
      );
    });
  }

}
