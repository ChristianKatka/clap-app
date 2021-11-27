import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { components } from '.';
import { effects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { reducers } from './store/reducers';
import { SharedModule } from 'src/shared/shared.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(effects),
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    AuthRoutingModule,
  ],
  declarations: [...components],
})
export class AuthModule {}
