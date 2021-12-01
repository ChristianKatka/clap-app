import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostFeatureContainerComponent } from './create-post-feature.container';
import { CreatePostContainerComponent } from './create-post/create-post.container';

export const childRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CreatePostContainerComponent,
  },
];

export const createPostRoutes: Routes = [
  {
    path: '',
    component: CreatePostFeatureContainerComponent,
    children: childRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(createPostRoutes)],
  exports: [RouterModule],
})
export class ContenthRoutingModule {}
