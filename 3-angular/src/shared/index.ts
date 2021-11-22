import { TrunctateTextComponent } from './trunctate-text/trunctate-text.component';
import { BooleanPipe } from './pipes/boolean.pipe';
import { IconPipe } from './pipes/icon-type.pipe';
import { FileSelectDirective } from './file-select/file-select.directive';
import { FileSelectComponent } from './file-select/file-select.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

export const components: any[] = [
  TrunctateTextComponent,
  FileSelectComponent,
  ProgressBarComponent,
];
export const pipes = [BooleanPipe, IconPipe];
export const directives = [FileSelectDirective];
