import { BooleanPipe } from './pipes/boolean.pipe';
import { IconPipe } from './pipes/icon-type.pipe';
import { FileSelectDirective } from './directives/file-select.directive';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { LogoComponent } from './components/logo/logo.component';
import { AlertComponent } from './components/info-boxes/alert.component';
import { InfoComponent } from './components/info-boxes/info.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SuccessComponent } from './components/success/success.component';
import { NavbarContainerComponent } from './components/navbar/navbar.container';
import { ClapAppContainer } from './components/clap-app-container/clap-app-container';
import { TruncateTextComponent } from './components/truncate-text/truncate-text.component';
import { SpaceGiverUsedWithFixedElementsComponent } from './components/space-giver-used-with-navbar/space-giver-used-with-fixed-elements.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { LoadingDotsComponent } from './components/loading-dots/loading-dots.component';
import { AutofocusDirective } from './directives/auto-focus.directive';
import { ProfileImageFileSelectComponent } from './components/profile-image-file-select/profile-image-file-select.component';
import { PostMediaSelectComponent } from './components/post-media-select/post-media-select.component';
import { DividerWithTextComponent } from './components/divider-with-text/divider-with-text.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const components: any[] = [
  TruncateTextComponent,
  ProfileImageFileSelectComponent,
  ProgressBarComponent,
  LogoComponent,
  AlertComponent,
  InfoComponent,
  LoadingSpinnerComponent,
  SuccessComponent,
  NavbarContainerComponent,
  NavbarComponent,
  ClapAppContainer,
  SpaceGiverUsedWithFixedElementsComponent,
  LoadingDotsComponent,
  AutofocusDirective,
  PostMediaSelectComponent,
  DividerWithTextComponent
];
export const pipes = [BooleanPipe, IconPipe, TimeAgoPipe];
export const directives = [FileSelectDirective, AutofocusDirective];
