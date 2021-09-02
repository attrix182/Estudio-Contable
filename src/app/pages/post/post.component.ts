import { Component, Input, OnInit } from '@angular/core';
import { ViewPostService } from 'src/app/services/view-post.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public post: any = ''

  constructor(private viewPostService: ViewPostService) {
    this.post = this.viewPostService.getPost()
  }

  ngOnInit(): void {

    if (!(this.viewPostService.getPost())) {
      location.assign('/')
    }
  }

  

}
