import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitializingService {
  constructor(private router: Router) {}

  // Loads all neccesery data needed to open application
  loadApplicationInitializingData(): Observable<{data: any}> {
    return of({data: ''});
  }
}
