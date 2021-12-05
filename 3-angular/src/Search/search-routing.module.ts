import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '@auth/guards';
import { SearchFeatureContainerComponent } from './search-feature.container';
import { SearchContainerComponent } from './search/search.container';

export const childRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    pathMatch: 'full',
    component: SearchContainerComponent,
  },
];

export const searchRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    component: SearchFeatureContainerComponent,
    children: childRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(searchRoutes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
