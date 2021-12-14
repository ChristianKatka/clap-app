import { BooleanPipe } from './pipes/boolean.pipe';
import { IconPipe } from './pipes/icon-type.pipe';
import { FileSelectDirective } from './components/file-select/file-select.directive';
import { ProfileImageSelectComponent } from './components/file-select/profile-image-select.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { LogoComponent } from './components/logo/logo.component';
import { AlertComponent } from './components/info-boxes/alert.component';
import { InfoComponent } from './components/info-boxes/info.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SuccessComponent } from './components/success/success.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClapAppContainer } from './components/clap-app-container/clap-app-container';
import { TrunctateTextComponent } from './components/trunctate-text/trunctate-text.component';
import { SpaceGiverUsedWithFixedElementsComponent } from './components/space-giver-used-with-navbar/space-giver-used-with-fixed-elements.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { LoadingDotsComponent } from './components/loading-dots/loading-dots.component';
import { AutofocusDirective } from './directives/auto-focus.directive';

export const components: any[] = [
  TrunctateTextComponent,
  ProfileImageSelectComponent,
  ProgressBarComponent,
  LogoComponent,
  AlertComponent,
  InfoComponent,
  LoadingSpinnerComponent,
  SuccessComponent,
  NavbarComponent,
  ClapAppContainer,
  SpaceGiverUsedWithFixedElementsComponent,
  LoadingDotsComponent,
  AutofocusDirective
];
export const pipes = [BooleanPipe, IconPipe, TimeAgoPipe];
export const directives = [FileSelectDirective, AutofocusDirective];
