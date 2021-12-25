import { Injectable } from '@angular/core';
import { AuthHTTPService } from '@app/services/auth-http.service';
import { AppState } from '@app/store/reducers';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { v4 as uuid } from 'uuid';
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

  // DYNAMODB
  public createNewSession(): Observable<{
    userId: string;
    sessionKey: string;
  }> {
    return this.authHttp
      .post<any>(`${environment.apiBaseUrl}/websocket/session`, {
        sessionKey: uuid(),
      })
      .pipe(
        map((response: { userId: string; sessionKey: string }) => response),
        catchError((error: any) => throwError(error.json()))
      );
  }

  public takeWebSocketConnection(
    userId: string,
    sessionKey: string
  ): Observable<string> {
    // const url =
    //   environment.webSocket.endPoint +
    //   '?userId=' +
    //   userId +
    //   '&sessionkey=' +
    //   sessionKey;

    // this.socket$ = webSocket({
    //   ...environment.webSocket,
    //   url,
    // });

    console.log('takeWebSocketConnection');

    this.socket$ = webSocket(environment.webSocket.endPoint);

    this.socketSubscription = this.socket$.subscribe({
      next: (msg) => this.onMessage(msg),
      error: (e) => console.error(e),
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

  public sendNotification() {
    console.log('viesti lähettty');
    this.socket$.next({ action: "sendNotification" });
  }

  private onMessage(message: any) {
    console.log('On message:');
    console.log(message);

    // this.store.dispatch(WebSocketActions.receivedMessage({ message }));
  }

  private onError(error: any) {
    console.log('ON ERROR: ' + JSON.stringify(error, null, 4));
  }

  private onComplete() {
    console.log('ON COMPLETE');
  }
}
