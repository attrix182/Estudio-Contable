import { Component, Input, OnInit } from '@angular/core';
import { ViewPostService } from 'src/app/services/view-post.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public post:any = ''

  constructor(private viewPostService: ViewPostService) { 

    setTimeout(() => {
    
      this.post = this.viewPostService.getPost()
      console.log(this.post)
     
    }, 3000);
  }

  ngOnInit(): void {


  
  }

}
