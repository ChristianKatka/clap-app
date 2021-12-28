import { Injectable } from '@angular/core';
import { AuthHTTPService } from '@app/services/auth-http.service';
import { AppState } from '@app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;
  private socketSubscription!: Subscription;

  constructor(
    private authHttp: AuthHTTPService,
    private store: Store<AppState>
  ) {}

  public createWebsocketSession(userId: string): Observable<string> {
    const url = `${environment.webSocket.endPoint}?userId=${userId}`;

    this.socket$ = webSocket(url);

    this.socketSubscription = this.socket$.subscribe({
      next: (msg) => this.onMessage(msg),
      error: (e) => console.error(JSON.stringify(e, null, 4)),
      complete: () => console.info('complete'),
    });
    return of('Connected.');
  }

  public disconnectWebSocketConnection(): Observable<string> {
    console.log('disconnectWebSocketConnection');

    if (this.socket$) {
      console.log(this.socket$);

      this.socket$.complete();
    }

    this.socketSubscription.unsubscribe();
    return of('Disconnected');
  }

  private onMessage(message: any) {
    console.log('On message:');
    console.log(message);
  }

}
