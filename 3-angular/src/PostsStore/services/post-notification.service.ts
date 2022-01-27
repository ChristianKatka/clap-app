import { Injectable } from '@angular/core';
import { AuthHTTPService } from '@app/services/auth-http.service';
import { MyNotification } from '@shared/models/my-notification.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostNotificationService {
  constructor(private authHttp: AuthHTTPService) {}

  //   createPostWithMedia(
  //     postWithMediaDraft: PostWithMediaImageUploaded
  //   ): Observable<PostWithMediaApiRes> {
  //     return this.authHttp.post(
  //       `${environment.apiBaseUrl}/posts/with-media`,
  //       postWithMediaDraft
  //     );
  //   }

  setMyNotificationsAsSeen(
    notifications: MyNotification[]
  ): Observable<MyNotification[]> {
    console.log(notifications);

    return this.authHttp.post(
      `${environment.apiBaseUrl}/postsaxx`,
      notifications
    );
  }
}
