import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarReportedComponent } from '../snackbar-reported/snackbar-reported.component';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  snackbarDurationInSeconds = 5;

  constructor(private snackBar: MatSnackBar) {}

  openReportedSnackbar() {
    this.snackBar.openFromComponent(SnackbarReportedComponent, {
      duration: this.snackbarDurationInSeconds * 1000,
    });
  }
}
