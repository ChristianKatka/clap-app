import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from '@auth/guards';
import { AppInitializationContainerComponent } from './app-initialization/app-initialization.container';
import { HomeFeatureContainerComponent } from '@home/home-feature.container';
import { WelcomeContainerComponent } from './welcome/welcome.container';
import { MyProfileFeatureContainerComponent } from 'src/MyProfile/my-profile-feature.container';
import { MyProfilePostsContainerComponent } from 'src/MyProfile/my-profile-posts/my-profile-posts.container';
import { MyProfileSavedContainerComponent } from 'src/MyProfile/my-profile-saved/my-profile-saved.container';
import { PostContainerComponent } from '@home/post/post.container';

export const myProfileChildren: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
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
    path: 'home/:postId',
    canActivate: [AuthenticatedGuard],
    component: PostContainerComponent,
  },
  {
    path: 'notification',
    canActivate: [AuthenticatedGuard],
    loadChildren: () =>
      import('../Notification/notification.module').then(
        (m) => m.NotificationModule
      ),
  },
  {
    path: 'search',
    canActivate: [AuthenticatedGuard],
    loadChildren: () =>
      import('../Search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'messages',
    canActivate: [AuthenticatedGuard],
    loadChildren: () =>
      import('../Messages/message.module').then((m) => m.MessageModule),
  },
  {
    path: 'my-profile',
    canActivate: [AuthenticatedGuard],
    component: MyProfileFeatureContainerComponent,
    children: myProfileChildren,
  },
  {
    path: 'settings',
    canActivate: [AuthenticatedGuard],
    loadChildren: () =>
      import('../Settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'create-post',
    canActivate: [AuthenticatedGuard],
    loadChildren: () =>
      import('../CreatePost/create-post.module').then(
        (m) => m.CreatePostModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
