import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {
  PostCommentActions,
  PostLikeActions,
  PostNotificationActions,
} from 'src/PostsStore/store/actions';
import { PostsExtendedAppState } from 'src/PostsStore/store/reducers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;
  private socketSubscription!: Subscription;

  constructor(private store: Store<PostsExtendedAppState>) {}

  public createWebsocketSession(userId: string): Observable<string> {
    const url = `${environment.webSocket.endPoint}?userId=${userId}`;

    this.socket$ = webSocket(url);

    this.socketSubscription = this.socket$.subscribe({
      next: (event) => this.onNewSocketEvent(event),
      error: (e) => console.error(JSON.stringify(e, null, 4)),
      complete: () => console.info('complete'),
    });
    return of('Connected.');
  }

  public disconnectWebSocketConnection(): Observable<string> {
    if (this.socket$) {
      this.socket$.complete();
    }

    this.socketSubscription.unsubscribe();
    return of('Disconnected');
  }

  private onNewSocketEvent(event: any) {
    if (event.newComment) {
      this.store.dispatch(
        PostCommentActions.newPostCommentHappenedViaSocket({
          postComment: event.newComment,
        })
      );
    }
    if (event.newNotification) {
      this.store.dispatch(
        PostNotificationActions.newNotificationHappenedViaSocket({
          notification: event.newNotification,
        })
      );
    }
    if (event.newLike) {
      this.store.dispatch(
        PostLikeActions.newLikeHappenedViaSocket({ like: event.newLike })
      );
    }
  }
}
