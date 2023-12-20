import { DividerWithTextComponent } from './components/divider-with-text/divider-with-text.component';
import { ErrorBoxComponent } from './components/error-box/error-box.component';
import { AlertComponent } from './components/info-boxes/alert.component';
import { InfoComponent } from './components/info-boxes/info.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SpaceGiverUsedWithFixedElementsComponent } from './components/space-giver-used-with-navbar/space-giver-used-with-fixed-elements.component';
import { SuccessComponent } from './components/success/success.component';
import { TruncateTextComponent } from './components/truncate-text/truncate-text.component';
import { AutofocusDirective } from './directives/auto-focus.directive';
import { BooleanPipe } from './pipes/boolean.pipe';
import { IconPipe } from './pipes/icon-type.pipe';

export const components: any[] = [
  TruncateTextComponent,
  ProgressBarComponent,
  LogoComponent,
  AlertComponent,
  InfoComponent,
  LoadingSpinnerComponent,
  SuccessComponent,
  SpaceGiverUsedWithFixedElementsComponent,
  AutofocusDirective,
  DividerWithTextComponent,
  NavbarComponent,
  ErrorBoxComponent,
];
export const pipes = [BooleanPipe, IconPipe];
export const directives = [AutofocusDirective];
