import {Component, OnInit} from '@angular/core';
import {EmailValidator, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {phoneNumberValidation} from './mobile.validation';
import {Router} from '@angular/router';
import {RestService} from '../../../service/rest/rest.service';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})

export class ContactComponent implements OnInit {
title = 'Want to get in  touch with us? Please fill this form!';
contactForm: FormGroup;

constructor(private router: Router,
            private rest: RestService) { }

ngOnInit(): void {
  this.createForm();
}

createForm() {
  this.contactForm = new FormGroup({
    name: new FormControl ('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email ]) ,
    phone: new FormControl('', []),
    // phone: new FormControl('',[Validators.required, phoneNumberValidation]),
    message: new FormControl('', [Validators.required, Validators.minLength(5)]),
})
}

get name() {return this.contactForm.get('name'); }
get email() {return this.contactForm.get('email'); }
get telephone () {return this.contactForm.get('phone'); }
get message() {return this.contactForm.get('message')}

  onSubmit() {
    const form = this.contactForm.value;
    const body = {
      username: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    };

    console.log('feedback:', body);
    this.rest.userFeedback(body).subscribe(
      data => {
        console.log('console-feedback:', data )
        this.router.navigate(['./home'])
      },
      error => {},
      () => {}
    )
  }
}
