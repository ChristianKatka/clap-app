import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'clap-app-change-location-bottom-sheet-search-form',
  templateUrl: 'change-location-bottom-sheet-search-form.component.html',
  styleUrls: ['change-location-bottom-sheet-search-form.component.scss'],
})
export class ChangeLocationBottomSheetSearchFormComponent implements OnDestroy {
  @Output()
  inputtedSearchText: EventEmitter<string> = new EventEmitter();

  searchFormControl = new FormControl('');
  searchFormGroup = new FormGroup({
    search: this.searchFormControl,
  });

  searchValue$ = this.searchFormGroup.valueChanges.subscribe({
    next: (searchForm) =>
      this.inputtedSearchText.emit(searchForm.search.trim()),
  });

  ngOnDestroy(): void {
    this.searchValue$.unsubscribe();
  }
}
