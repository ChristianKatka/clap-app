import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageFeatureContainerComponent } from './message-feature.container';
import { MessageContainerComponent } from './message/message.container';

export const childRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MessageContainerComponent,
  },
];

export const messageRoutes: Routes = [
  {
    path: '',
    component: MessageFeatureContainerComponent,
    children: childRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(messageRoutes)],
  exports: [RouterModule],
})
export class ContenthRoutingModule {}
