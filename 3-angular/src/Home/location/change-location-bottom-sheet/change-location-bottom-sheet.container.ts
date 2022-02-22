import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AuthExtendedAppState } from '@auth/store/reducers';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: 'change-location-bottom-sheet.container.html',
  styleUrls: ['change-location-bottom-sheet.container.scss'],
})
export class ChangeLocationBottomSheetContainerComponent implements OnInit {
  locations = [
    'Helsinki',
    'Espoo',
    'Tampere',
    'Vantaa',
    'Oulu',
    'Turku',
    'Jyväskylä',
    'Kuopio',
    'Lahti',
    'Pori',
    'Kouvola',
    'Joensuu',
    'Lappeenranta',
    'Hämeenlinna',
    'Vaasa',
    'Seinäjoki',
    'Rovaniemi',
    'Mikkeli',
    'Salo',
    'Kotka',
  ];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ChangeLocationBottomSheetContainerComponent>,
    private store: Store<AuthExtendedAppState>
  ) {}

  ngOnInit() {}

  close() {
    this.bottomSheetRef.dismiss();
  }

  logOut() {
    this.close();
  }

  searchTextInputted(searchText: string) {
    console.log(searchText);
  }
}
