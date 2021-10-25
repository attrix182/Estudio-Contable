import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseFormAbstract } from 'src/app/shared/base-form-abstract';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent extends BaseFormAbstract implements OnInit {
  formGroup: FormGroup;
  loading: boolean = false;

  constructor(private builder: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.formGroup.reset();
    }, 3000);
  }

  initForm() {
    this.formGroup = this.builder.group({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ]),
      subject: new FormControl('', [Validators.required]),
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  setErrorMessages() {
    this.errroMessages = {
      fullname: {
        required: 'El nombre completo es obligatorio',
      },
      email: {
        required: 'El email es obligatorio',
        pattern: 'El email es invalido',
      },
      subject: {
        required: 'El asunto es obligatorio',
      },
      comment: {
        required: 'El comentario es obligatorio',
        minlength: 'El comentario debe tener al menos 10 caracteres',
      },
    };
  }
}
