import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { Strategy } from '../../../_models/strategy';
import { AlertifyService } from '../../../_services/alertify.service';
import { environment } from '../../../../environments/environment';
import { HrService } from '../../../_services/hr.service';

@Component({
  selector: 'app-strategy-documentation',
  templateUrl: './strategy-documentation.component.html',
  styleUrls: ['./strategy-documentation.component.css']
})
export class StrategyDocumentationComponent implements OnInit {
  @Input() strategy: Strategy;
  @Input() isReadOnly: boolean; 
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  loading = false;

  constructor(private alertifyService: AlertifyService, private hrService: HrService, ) { }

  ngOnInit() {
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url:
        this.baseUrl +
        'hr/strategies/edit/' +
        this.strategy.id +
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

  deleteDocumentation(id: number) {
    this.alertifyService.confirm(
      'Etes-vous sûr de vouloir supprimer ce document?',
      () => {
        this.loading = true;
        this.hrService
          .deleteStrategyDocument(id)
          .subscribe(
            () => {
              this.loading = false;
              this.strategy.documentationUrl = null;
              this.alertifyService.success('Le document a été supprimée');
            },
            error => {
              this.loading = false;
              this.alertifyService.error('Échec de la suppression de document.');
            }
          );
      }
    );
  }
}
