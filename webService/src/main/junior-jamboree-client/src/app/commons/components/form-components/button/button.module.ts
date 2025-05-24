import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppButtonComponent } from './button.component';
import { AppIconButtonComponent } from './icon-button/icon-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AppButtonComponent, AppIconButtonComponent],
  exports: [AppButtonComponent, AppIconButtonComponent],
})
export class AppButtonModule {}
