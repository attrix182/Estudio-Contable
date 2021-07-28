import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  FormData: FormGroup;
  loading:boolean = false;

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.FormData = this.builder.group({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      comment: new FormControl('', [Validators.required])
    })
  }

  showContact(form:any){
    this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.FormData.reset();
      }, 3000);

    console.log(form);
  }

}
