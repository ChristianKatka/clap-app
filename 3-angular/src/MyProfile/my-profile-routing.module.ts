import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileFeatureContainerComponent } from './my-profile-feature.container';
import { MyProfilePostsContainerComponent } from './my-profile-posts/my-profile-posts.container';
import { MyProfileSavedContainerComponent } from './my-profile-saved/my-profile-saved.container';

export const childRoutes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
  },
  {
    path: 'posts',
    component: MyProfilePostsContainerComponent,
  },
  {
    path: 'saved',
    component: MyProfileSavedContainerComponent,
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
