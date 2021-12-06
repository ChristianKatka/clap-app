import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthHTTPService } from '@app/services/auth-http.service';
import { PostWithImageDraft } from '@shared/models/post-with-image.model';
import { PostWithoutImageDraft } from '@shared/models/post-without-image.model';
import { MyProfile } from '@shared/models/my-profile.model';

@Injectable({
  providedIn: 'root',
})
export class MyProfileService {
  constructor(private authHttp: AuthHTTPService) {}

  updateUserBio(bio: string): Observable<MyProfile> {
    return this.authHttp.put(`${environment.apiBaseUrl}/user/bio`, { bio });
  }
}
