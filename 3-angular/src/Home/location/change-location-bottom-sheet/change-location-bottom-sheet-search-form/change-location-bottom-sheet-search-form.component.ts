import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, map } from 'rxjs';

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

  searchValue$ = this.searchFormGroup.valueChanges
    .pipe(map((searchText) => searchText.search.trim(), distinctUntilChanged()))
    .subscribe({
      next: (searchText) => this.inputtedSearchText.emit(searchText),
    });

  ngOnDestroy(): void {
    this.searchValue$.unsubscribe();
  }
}
