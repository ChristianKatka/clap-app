import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AboutModule } from 'src/About/about.module';
import { AuthModule } from 'src/Auth/auth.module';
import { HomeModule } from 'src/Home/home.module';
import { MyProfileModule } from 'src/MyProfile/my-profile.module';
import { PostsStoreModule } from 'src/PostsStore/posts-store.module';
import { SharedModule } from 'src/shared/shared.module';
import { WebSocketStoreModule } from 'src/WebSocketStore/websocket-store.module';
import { components } from '.';
import { environment } from '../environments/environment';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { effects } from './store/effects';
import { reducers } from './store/reducers';
import { RouterStateSerializer } from './store/router-state.serializer';

@NgModule({
  declarations: [AppComponent, ...components],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
      serializer: RouterStateSerializer,
    }),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot(effects),
    AuthModule,
    SharedModule,
    HomeModule,
    MaterialModule,
    AboutModule,
    PostsStoreModule,
    MyProfileModule,
    WebSocketStoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
