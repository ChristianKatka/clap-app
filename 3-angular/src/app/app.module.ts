import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStateSerializer } from './store/router-state.serializer';
import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ImageModule } from 'src/Image/image.module';
import { SharedModule } from 'src/shared/shared.module';
import { AuthModule } from 'src/Auth/auth.module';

import { components } from ".";
import { HomeModule } from 'src/Home/home.module';

@NgModule({
  declarations: [AppComponent],
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
    ImageModule,
    SharedModule,
    HomeModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent, ...components],
})
export class AppModule {}
