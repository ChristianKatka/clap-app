import { Component, OnInit } from '@angular/core';
import { MyProfileBottomSheetService } from '../services/my-profile-bottom-sheet.service';

@Component({
  selector: 'clap-app-my-profile-top-bar',
  templateUrl: 'my-profile-top-bar.component.html',
  styleUrls: ['my-profile-top-bar.component.scss'],
})
export class MyProfileTopBarComponent implements OnInit {
  constructor(
    private myProfileBottomSheetService: MyProfileBottomSheetService
  ) {}

  ngOnInit() {}

  openCreateNewAccountOrLogOutBottomSheet() {
    this.myProfileBottomSheetService.openCreateNewAccountOrLogOutBottomSheet();
  }
}
