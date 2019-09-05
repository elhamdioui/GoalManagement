import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

import { AlertifyService } from './../../_services/alertify.service';
import { AdminService } from './../../_services/admin.service';
import { User } from '../../_models/user';
import { Department } from '../../_models/department';
import { UserStatus } from './../../_models/userStatus';

@Component({
  selector: 'app-collaborator-new',
  templateUrl: './collaborator-new.component.html',
  styleUrls: ['./collaborator-new.component.css']
})
export class CollaboratorNewComponent implements OnInit {
  @Input() departmentList: Department[] = [];
  @Input() userStatusList: UserStatus[] = [];
  @Output() cancelRegister = new EventEmitter();
  @Output() switchOffRegister = new EventEmitter();
  newUser: User;
  newUserForm: FormGroup;


  constructor(private fb: FormBuilder, private adminService: AdminService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.createUserForm();
  }

  createUserForm() {
    this.newUserForm = this.fb.group(
      {
        employeeNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        title: ['', Validators.required],
        userStatusId: [null, [Validators.required]],
        departmentId: [null, [Validators.required]],
        RecruitmentDate: [null, Validators.required]
      });
  }

  checkValidEmail(control: AbstractControl) {
    return new Promise((resolve, reject) => {
      this.adminService.emailAlreadyExists(control.value).subscribe(result => {
        if (result) {
          resolve({ emailIsTaken: true })
        } else { resolve(null) }
      },
        error => {
          this.alertify.error(error);
        })
    });
  }

  createUser() {
    if (this.newUserForm.valid) {
      this.newUser = Object.assign({}, this.newUserForm.value);
      this.adminService.createUser(this.newUser).subscribe(
        next => {
          this.alertify.success('Utilisateur créé avec succès');
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          this.switchOffRegister.emit(true);
        }
      );
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
