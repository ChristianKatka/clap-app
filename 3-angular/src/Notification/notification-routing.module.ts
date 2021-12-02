import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationFeatureContainerComponent } from './notification-feature.container';
import { NotificationsContainerComponent } from './notifications/notifications.container';

export const childRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NotificationsContainerComponent,
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
