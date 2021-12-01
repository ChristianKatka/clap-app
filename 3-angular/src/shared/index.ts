import { TrunctateTextComponent } from './trunctate-text/trunctate-text.component';
import { BooleanPipe } from './pipes/boolean.pipe';
import { IconPipe } from './pipes/icon-type.pipe';
import { FileSelectDirective } from './file-select/file-select.directive';
import { FileSelectComponent } from './file-select/file-select.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { LogoComponent } from './logo/logo.component';
import { AlertComponent } from './info-boxes/alert.component';
import { InfoComponent } from './info-boxes/info.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SuccessComponent } from './success/success.component';
import { NavbarContainerComponent } from './navbar/navbar.container';
import { NavbarComponent } from './navbar/navbar.component';
import { ClapAppContainer } from './clap-app-container/clap-app-container';

export const components: any[] = [
  TrunctateTextComponent,
  FileSelectComponent,
  ProgressBarComponent,
  LogoComponent,
  AlertComponent,
  InfoComponent,
  LoadingSpinnerComponent,
  SuccessComponent,
  NavbarContainerComponent,
  NavbarComponent,
  ClapAppContainer
];
export const pipes = [BooleanPipe, IconPipe];
export const directives = [FileSelectDirective];
