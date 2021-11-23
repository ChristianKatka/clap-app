import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { components } from '.';
import { SharedModule } from 'src/shared/shared.module';
// import { StoreModule } from '@ngrx/store';
// import { reducers } from './store/reducers';
// import { effects } from './store/effects';
// import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    // StoreModule.forFeature('home-feature', reducers),
    // EffectsModule.forFeature(effects),
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
  ],
  declarations: [...components],
  entryComponents: [],
  exports: [...components],
})
export class HomeModule {}
