import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '@auth/guards';
import { CreatePostFeatureContainerComponent } from './create-post-feature.container';
import { CreatePostContainerComponent } from './create-post/create-post.container';

export const childRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    pathMatch: 'full',
    component: CreatePostContainerComponent,
  },
];

export const createPostRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    component: CreatePostFeatureContainerComponent,
    children: childRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(createPostRoutes)],
  exports: [RouterModule],
})
export class CreatePostRoutingModule {}
