import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotificationRoutingModule } from './notification-routing.module';
import { components } from '.';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    NotificationRoutingModule,
    SharedModule,
  ],
  declarations: [...components],
  exports: [...components],
})
export class NotificationModule {}
