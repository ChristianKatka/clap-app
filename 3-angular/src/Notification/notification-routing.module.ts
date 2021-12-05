import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '@auth/guards';
import { NotificationFeatureContainerComponent } from './notification-feature.container';
import { NotificationsContainerComponent } from './notifications/notifications.container';

export const childRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    pathMatch: 'full',
    component: NotificationsContainerComponent,
  },
];

export const notificationRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    component: NotificationFeatureContainerComponent,
    children: childRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(notificationRoutes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}
