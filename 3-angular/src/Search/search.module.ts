import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchRoutingModule } from './search-routing.module';
import { components } from '.';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SearchRoutingModule,
    SharedModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class SearchModule {}
