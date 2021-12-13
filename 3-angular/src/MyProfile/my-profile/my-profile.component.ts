import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';

@Component({
  selector: 'clap-app-my-profile',
  templateUrl: 'my-profile.component.html',
  styleUrls: ['my-profile.component.scss'],
})
export class MyProfileComponent implements OnChanges {
  @Input()
  myProfileData: any

  @Output()
  openEditProfileBottomSheet = new EventEmitter();

  ngOnChanges() {
    console.log(this.myProfileData);
  }
}
