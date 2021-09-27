import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  userForm: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;
  loading: boolean = false;

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.builder.group({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.compose([Validators.required, Validators.pattern(this.isEmail)])]),
      subject: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.userForm.reset();
    }, 3000);

  }

  isValidField(field: string): string {
    const validateField = this.userForm.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
        ? 'is-valid'
        : '';
  }

}
