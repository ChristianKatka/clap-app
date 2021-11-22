import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { components, pipes, directives } from '.';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  declarations: [...components, ...pipes, ...directives],
  exports: [...components, ...pipes, ...directives],
  providers: [],
  bootstrap: [],
  entryComponents: [],
})
export class SharedModule {}
