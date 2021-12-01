import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '@auth/guards';
import { AppInitializationContainerComponent } from './app-initialization/app-initialization.container';
import { HomeFeatureContainerComponent } from '@home/home-feature.container';
import { WelcomeContainerComponent } from './welcome/welcome.container';
import { SignInNewPasswordRequiredContainerComponent } from '@auth/components/sign-in-new-password-required/sign-in-new-password-required.container';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'welcome',
    canActivate: [AuthenticatedGuard],
    component: WelcomeContainerComponent,
  },
  {
    path: 'initializing',
    canActivate: [AuthenticatedGuard],
    pathMatch: 'full',
    component: AppInitializationContainerComponent,
  },
  {
    path: 'home',
    canActivate: [AuthenticatedGuard],
    component: HomeFeatureContainerComponent,
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('../Notification/notification.module').then((m) => m.NotificationModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('../Search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'my-profile',
    loadChildren: () =>
      import('../MyProfile/my-profile.module').then((m) => m.MyProfileModule),
  },
  {
    path: 'create-post',
    loadChildren: () =>
      import('../CreatePost/create-post.module').then((m) => m.CreatePostModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
