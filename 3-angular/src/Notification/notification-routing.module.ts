import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationFeatureContainerComponent } from './notification-feature.container';
import { NotificationContainerComponent } from './notification/notification.container';

export const childRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NotificationContainerComponent,
  },
];

export const notificationRoutes: Routes = [
  {
    path: '',
    component: NotificationFeatureContainerComponent,
    children: childRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(notificationRoutes)],
  exports: [RouterModule],
})
export class ContenthRoutingModule {}
