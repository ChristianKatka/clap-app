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

  setMyNotificationsAsSeen(
    notifications: MyNotification[]
  ): Observable<MyNotification[]> {
    return this.authHttp.post(
      `${environment.apiBaseUrl}/notification/set-notification-as-seen`,
      notifications
    );
  }
}
