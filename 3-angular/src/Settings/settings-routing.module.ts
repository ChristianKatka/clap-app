import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsFeatureContainerComponent } from './settings-feature.container';
import { SettingsContainerComponent } from './settings/settings.container';

export const childRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SettingsContainerComponent,
  },
];

export const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsFeatureContainerComponent,
    children: childRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule],
})
export class ContenthRoutingModule {}
