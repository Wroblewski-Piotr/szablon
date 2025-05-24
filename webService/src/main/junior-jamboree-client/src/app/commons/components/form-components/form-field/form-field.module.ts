import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppFormFieldComponent} from './form-field.component';
import {AppInputComponent} from './input/input.component';
import {AppErrorComponent} from './error/error.component';
import {AppLabelComponent} from './label/label.component';
import {AppSuffixDirective} from './input/suffix.directive';
import {AppPrefixDirective} from './input/prefix.directive';
import {TranslocoModule} from "@ngneat/transloco";

const COMPONENTS = [AppFormFieldComponent, AppInputComponent, AppErrorComponent, AppLabelComponent];
const DIRECTIVES = [AppSuffixDirective, AppPrefixDirective];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: [...COMPONENTS, ...DIRECTIVES],
  imports: [CommonModule, TranslocoModule],
})
export class FormFieldModule {
}
