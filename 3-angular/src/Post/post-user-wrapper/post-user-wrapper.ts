import { Component, Input } from '@angular/core';
import { SnackBarService } from '../services/snackbar.service';

@Component({
  selector: 'clap-app-post-user-wrapper',
  templateUrl: 'post-user-wrapper.html',
  styleUrls: ['post-user-wrapper.scss'],
})
export class PostUserWrapperComponent {
  @Input()
  nickname = '';

  @Input()
  creatorsProfileImage = '';

  @Input()
  postLocation = '';

  constructor(private snackBarService: SnackBarService) {}

  reportInappropriate() {
    this.snackBarService.openReportedSnackbar();
  }
}
