import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';

import { HrService } from '../../../_services/hr.service';
import { AuthService } from '../../../_services/auth.service';
import { EvaluationFile } from '../../../_models/evaluationFile';
import { Strategy } from '../../../_models/strategy';
import { BehavioralSkill } from '../../../_models/behavioralSkill';
import { UserService } from '../../../_services/user.service';
import { AlertifyService } from '../../../_services/alertify.service';

@Component({
  selector: 'app-evaluation-hr-new',
  templateUrl: './evaluation-hr-new.component.html',
  styleUrls: ['./evaluation-hr-new.component.css']
})
export class EvaluationHrNewComponent implements OnInit {
  @Output() cancelCreation = new EventEmitter();
  @Output() switchOffCreation = new EventEmitter();
  newForm: FormGroup;
  loading = false;
  newEvaluationFile: EvaluationFile;
  strategyList: Strategy[];
  behavioralSkillList: BehavioralSkill[];

  constructor(private fb: FormBuilder, private userService: UserService, private hrService: HrService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadPublishedStratgeies();
    this.loadPublishedBehavioralSkills();
    this.createForm();
  }

  loadPublishedStratgeies() {
    this.loading = true;
    this.userService.getPublishedStrategies().subscribe(
      (result: Strategy[]) => {
        this.strategyList = result;
      },
      error => {
        this.loading = false;
        this.alertify.error(error);
      }
    );
  }
  loadPublishedBehavioralSkills() {
    this.loading = true;
    this.userService.getPublishedBehavioralSkills().subscribe(
      (result: BehavioralSkill[]) => {
        this.behavioralSkillList = result;
      },
      error => {
        this.loading = false;
        this.alertify.error(error);
      }
    );
  }

  createForm() {
    this.newForm = this.fb.group(
      {
        title: ['', Validators.required],
        year: ['', Validators.required],
        stratgey: ['', Validators.required],
        //behaviorlSkills: ['', Validators.required],
      });
  }

  create() {
    if (this.newForm.valid) {
      this.newEvaluationFile = Object.assign({}, this.newForm.value);
      this.loading = true;
      this.hrService.createEvaluationFile(this.authService.decodedToken.nameid, this.newEvaluationFile).subscribe(
        () => {
          this.loading = false;
          this.alertify.success('Fiche d\'évaluation créé avec succèes');
        },
        error => {
          this.loading = false;
          this.alertify.error(error);
        },
        () => { this.switchOffCreation.emit(true); }
      );
    }
  }

  cancel() {
    this.cancelCreation.emit(false);
  }
}
