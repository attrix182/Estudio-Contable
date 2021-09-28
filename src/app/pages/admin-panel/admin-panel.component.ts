import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { FireService } from 'src/app/services/fire.service';


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

  postFinal: any;

  constructor(public fb: FormBuilder, private authService: AuthService, private router: Router,
    private modalService: NgbModal, private FB: FormBuilder, private vref: ViewContainerRef, private fire: FireService) {


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
  }


  ngOnInit(): void { }




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

    this.postFinal =  this.post.value

    this.postFinal.img = this.photo;

    this.fire.InsertPost('posts', this.postFinal);

    this.modalService.dismissAll();

  }


  logOut() {
    this.authService.LogOutCurrentUser();
    this.router.navigateByUrl('/');

  }

}
