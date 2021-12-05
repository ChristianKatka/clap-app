import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '@auth/guards';
import { MessageFeatureContainerComponent } from './message-feature.container';
import { MessageContainerComponent } from './message/message.container';

export const childRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    pathMatch: 'full',
    component: MessageContainerComponent,
  },
];

export const messageRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    component: MessageFeatureContainerComponent,
    children: childRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(messageRoutes)],
  exports: [RouterModule],
})
export class MessageRoutingModule {}
