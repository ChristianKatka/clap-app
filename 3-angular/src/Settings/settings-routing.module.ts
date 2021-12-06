import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '@auth/guards';
import { SettingsFeatureContainerComponent } from './settings-feature.container';
import { SettingsProfileContainerComponent } from './settings/settings-profile/settings-profile.container';
import { SettingsContainerComponent } from './settings/settings.container';

export const childRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    pathMatch: 'full',
    component: SettingsContainerComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthenticatedGuard],
    component: SettingsProfileContainerComponent,
  },
];

export const settingsRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    component: SettingsFeatureContainerComponent,
    children: childRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
