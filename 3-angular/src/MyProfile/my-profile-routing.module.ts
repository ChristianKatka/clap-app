import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileFeatureContainerComponent } from './my-profile-feature.container';

export const myProfileRoutes: Routes = [
  {
    path: '',
    component: MyProfileFeatureContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(myProfileRoutes)],
  exports: [RouterModule],
})
export class ContenthRoutingModule {}
