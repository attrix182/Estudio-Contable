import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  userForm: FormGroup;
  private isEmail =/\S+@\S+\.\S+/;
  loading:boolean = false;

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.builder.group({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.compose([Validators.required,Validators.pattern(this.isEmail)])]),
      subject:new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required])
    })
  }

  onSubmit(){
    this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.userForm.reset();
      }, 3000);

    console.log(this.userForm);
  }

 /*  MatchPassword(field: string) {
    let password = this.userForm.get('password').value;
    let confirmPassword = this.userForm.get(field).value;
    const validateField = this.userForm.get('password');
    const cP = this.userForm.get(field);
    let passwordMatch: string;

    if (!validateField.valid && validateField.touched && !cP.valid && cP.touched) {
      passwordMatch = 'is-invalid';
      cP.setErrors({ passwordMatch: true });
    } else if (validateField.valid ) {
      if (password != confirmPassword) {
        passwordMatch = 'is-invalid';
        cP.setErrors({ passwordMatch: true });
      } else {
        cP.setErrors(null);
        passwordMatch = 'is-valid';
      }
    }
    return passwordMatch;
  } */

  isValidField(field: string): string {
    const validateField = this.userForm.get(field);
    return !validateField.valid && validateField.touched
      ? 'is-invalid'
      : validateField.touched
      ? 'is-valid'
      : '';
  }

}
