import { Router } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

import { AlertifyService } from '../../../_services/alertify.service';
import { HrService } from '../../../_services/hr.service';
import { AuthService } from '../../../_services/auth.service';
import { Strategy } from '../../../_models/strategy';

@Component({
  selector: 'app-strategy-new',
  templateUrl: './strategy-new.component.html',
  styleUrls: ['./strategy-new.component.css']
})
export class StrategyNewComponent implements OnInit {
  @Output() cancelCreation = new EventEmitter();
  newStrategy: Strategy;
  newStrategyForm: FormGroup;


  constructor(private fb: FormBuilder, private hrService: HrService, private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.createStrategyForm();
  }

  createStrategyForm() {
    this.newStrategyForm = this.fb.group(
      {
        title: ['', Validators.required],
        description: ['', [Validators.required]]
      });
  }

  createStrategy() {
    if (this.newStrategyForm.valid) {
      this.newStrategy = Object.assign({}, this.newStrategyForm.value);

      this.hrService.createStrategy(this.authService.decodedToken.nameid, this.newStrategy).subscribe(
        () => {
          this.alertify.success('Stratégie créé avec succèes');
          this.router.navigate(['/hr']);
        },
        error => {
          this.alertify.error(error);
        }
      );
    }
  }

  cancel() {
    this.cancelCreation.emit(false);
  }
}
