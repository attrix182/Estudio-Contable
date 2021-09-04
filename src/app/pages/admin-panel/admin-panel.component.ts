import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';

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

  constructor(private authService: AuthService, private router: Router, private viewPostService: ViewPostService,
    private modalService: NgbModal,private vref: ViewContainerRef) { }




  ngOnInit(): void {}

  logOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/');
    
  }


  writePost(){
    this.modalService.open(this.modaladdPost)
  }

}
