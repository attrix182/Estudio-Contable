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


  @ViewChild('modaladdPost', { read: TemplateRef })
  modaladdPost: TemplateRef<any>

  filePath: string;
  myForm: FormGroup;
  post: FormGroup;


  constructor(public fb: FormBuilder, private authService: AuthService, private router: Router,
    private modalService: NgbModal,private FB: FormBuilder, private vref: ViewContainerRef, private fire: FireService) {


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


  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.myForm.patchValue({
      img: file
    });

    this.myForm.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  ngOnInit(): void { }

  logOut() {
    this.authService.LogOutCurrentUser();
    this.router.navigateByUrl('/');

  }


  writePost() {
    this.modalService.open(this.modaladdPost)
  }

  addPost() {
    //arreglar fecha de publicacion
    var date = new Date();
    this.post.value.fecha = date.getTime();

    this.fire.Insert('posts', this.post.value);
    this.modalService.dismissAll();

  }

}
