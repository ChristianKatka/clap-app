import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostLocation } from '@shared/models/post-location.model';

@Component({
  selector: 'clap-app-change-location-bottom-sheet',
  templateUrl: 'change-location-bottom-sheet.component.html',
  styleUrls: ['change-location-bottom-sheet.component.scss'],
})
export class ChangeLocationBottomSheetComponent {
  @Input()
  selectedPostLocation: string | null = '';
  @Input()
  postLocations: PostLocation[] | null = [];

  @Output()
  closeBottomSheet = new EventEmitter();
  @Output()
  onSelectLocation: EventEmitter<string> = new EventEmitter();
  @Output()
  onSearchTextInputted: EventEmitter<string> = new EventEmitter();

  close() {
    this.closeBottomSheet.emit();
  }

  logOut() {
    this.closeBottomSheet.emit();
  }

  selectLocation(location: PostLocation) {
    this.onSelectLocation.emit(location.name);
  }

  searchTextInputted(searchText: string) {
    this.onSearchTextInputted.emit(searchText);
  }
}
