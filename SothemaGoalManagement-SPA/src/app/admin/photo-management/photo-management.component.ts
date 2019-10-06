import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  photos: any;
  public loading = false;

  constructor(private adminService: AdminService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.loading = true;
    this.adminService.getPhotosForApproval().subscribe((photos) => {
      this.photos = photos;
      this.loading = false;
    }, error => {
      this.alertify.error(error);
      this.loading = false;
    })
  }

  approvePhoto(photoId) {
    this.loading = true;
    this.adminService.approvePhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
      this.loading = false;
    }, error => {
      this.alertify.error(error);
      this.loading = false;
    })
  }

  rejectPhoto(photoId) {
    this.loading = true;
    this.adminService.rejectPhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
      this.loading = false;
    }, error => {
      this.alertify.error(error);
      this.loading = false;
    });
  }

}
