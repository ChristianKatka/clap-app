import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyProfile } from '@shared/models/my-profile.model';

@Component({
  selector: 'clap-app-my-profile',
  templateUrl: 'my-profile.component.html',
  styleUrls: ['my-profile.component.scss'],
})
export class MyProfileComponent {
  @Input()
  myProfileData: MyProfile | null | undefined;

  @Output()
  openEditProfileBottomSheet = new EventEmitter();

}
