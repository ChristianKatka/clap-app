import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PostModule } from 'src/Post/post.module';
import { SharedModule } from 'src/shared/shared.module';
import { components } from '.';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    PostModule,
  ],

  declarations: [...components],
  entryComponents: [],
  exports: [...components],
})
export class HomeModule {}
