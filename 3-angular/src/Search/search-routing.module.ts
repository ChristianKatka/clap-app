import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFeatureContainerComponent } from './search-feature.container';
import { SearchContainerComponent } from './search/search.container';

export const childRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SearchContainerComponent,
  },
];

export const searchRoutes: Routes = [
  {
    path: '',
    component: SearchFeatureContainerComponent,
    children: childRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(searchRoutes)],
  exports: [RouterModule],
})
export class ContenthRoutingModule {}
