import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { Strategy } from '../../../_models/strategy';
import { AlertifyService } from '../../../_services/alertify.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-strategy-documentation',
  templateUrl: './strategy-documentation.component.html',
  styleUrls: ['./strategy-documentation.component.css']
})
export class StrategyDocumentationComponent implements OnInit {
  @Input() strategy: Strategy;
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        'hr/' +
        this.authService.decodedToken.nameid +
        '/documentation',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['pdf'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Strategy = JSON.parse(response);
        this.strategy.documentationUrl = res.documentationUrl;
      }
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.alertifyService.error(response);
    }
  }
}
