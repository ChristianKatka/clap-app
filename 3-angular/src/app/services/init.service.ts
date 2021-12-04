import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthHTTPService } from './auth-http.service';

@Injectable({
  providedIn: 'root',
})
export class InitializeService {
  constructor(private authHttp: AuthHTTPService) {}

  // Loads all neccesery data needed to open application
  loadApplicationInitializeData(): Observable<{ posts: any; myProfile: any }> {
    return this.authHttp.get(`${environment.apiBaseUrl}/initialize`);
  }
}
