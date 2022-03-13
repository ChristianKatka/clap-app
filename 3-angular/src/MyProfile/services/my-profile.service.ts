import { Injectable } from '@angular/core';
import { AuthHTTPService } from '@app/services/auth-http.service';
import { MyProfile } from '@shared/models/my-profile.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MyProfileService {
  constructor(private authHttp: AuthHTTPService) {}

  updateUserBio(bio: string): Observable<MyProfile> {
    return this.authHttp.put(`${environment.apiBaseUrl}/user/bio`, { bio });
  }

  updateUsersSelectedLocation(selectedLocation: string): Observable<MyProfile> {
    return this.authHttp.put(`${environment.apiBaseUrl}/user/select-location`, {
      selectedLocation,
    });
  }
}
