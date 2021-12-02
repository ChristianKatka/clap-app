import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContenthRoutingModule } from './create-post-routing.module';
import { components } from '.';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ContenthRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [...components],
  exports: [...components],
})
export class CreatePostModule {}
