import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { User } from './../../_models/user';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.css']
})
export class NewUserModalComponent implements OnInit {
  @Output() createNewUser = new EventEmitter();
  newUser: User;
  newUserForm: FormGroup;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.newUserForm = this.fb.group(
      {
        email: ['', Validators.required, Validators.email],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        title: ['', Validators.required],
        department: ['', Validators.required],
        startDateOfWork: [null, Validators.required]
      });
  }

  createUser() {
    this.createNewUser.emit(this.newUser);
    this.bsModalRef.hide();
  }
}
