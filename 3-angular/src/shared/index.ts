import { BooleanPipe } from './pipes/boolean.pipe';
import { IconPipe } from './pipes/icon-type.pipe';
import { FileSelectDirective } from './components/file-select/file-select.directive';
import { FileSelectComponent } from './components/file-select/file-select.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { LogoComponent } from './components/logo/logo.component';
import { AlertComponent } from './components/info-boxes/alert.component';
import { InfoComponent } from './components/info-boxes/info.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SuccessComponent } from './components/success/success.component';
import { NavbarContainerComponent } from './components/navbar/navbar.container';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClapAppContainer } from './components/clap-app-container/clap-app-container';
import { TrunctateTextComponent } from './components/trunctate-text/trunctate-text.component';

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
  ClapAppContainer,
];
export const pipes = [BooleanPipe, IconPipe];
export const directives = [FileSelectDirective];
