import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileFeatureContainerComponent } from './my-profile-feature.container';
import { MyProfileContainerComponent } from './my-profile/my-profile.container';

export const childRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MyProfileContainerComponent,
  },
];

export const myProfileRoutes: Routes = [
  {
    path: '',
    component: MyProfileFeatureContainerComponent,
    children: childRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(myProfileRoutes)],
  exports: [RouterModule],
})
export class ContenthRoutingModule {}
