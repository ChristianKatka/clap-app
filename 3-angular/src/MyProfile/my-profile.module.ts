import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContenthRoutingModule } from './my-profile-routing.module';
import { components } from '.';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ContenthRoutingModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class MyProfileModule {}
