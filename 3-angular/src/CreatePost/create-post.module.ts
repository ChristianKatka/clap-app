import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { WebcamModule } from 'ngx-webcam';
import { components } from '.';
import { MaterialModule } from '../material.module';
import { CreatePostRoutingModule } from './create-post-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    CreatePostRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    WebcamModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class CreatePostModule {}
