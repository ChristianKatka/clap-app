import { Injectable } from '@angular/core';
import { InitializeData } from '@shared/models/Initialize-data.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthHTTPService } from './auth-http.service';

@Injectable({
  providedIn: 'root',
})
export class InitializeService {
  constructor(private authHttp: AuthHTTPService) {}

  // Loads all neccesery data needed to open application
  loadApplicationInitializeData(): Observable<InitializeData> {
    return this.authHttp.get(`${environment.apiBaseUrl}/initialize`);
  }
}
