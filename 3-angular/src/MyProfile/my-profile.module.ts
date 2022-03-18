import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { PostModule } from 'src/Post/post.module';
import { components } from '.';
import { MaterialModule } from '../material.module';
import { effects } from './store/effects';
import { featureKey, reducers } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(featureKey, reducers),
    EffectsModule.forFeature(effects),
    PostModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class MyProfileModule {}
