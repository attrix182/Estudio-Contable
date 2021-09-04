import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ViewPostService } from 'src/app/services/view-post.service';

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


  constructor(public fb: FormBuilder,private authService: AuthService, private router: Router, private viewPostService: ViewPostService,
    private modalService: NgbModal, private vref: ViewContainerRef) {
      this.myForm = this.fb.group({
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
    this.authService.logOut();
    this.router.navigateByUrl('/');

  }


  writePost() {
    this.modalService.open(this.modaladdPost)
  }

}
