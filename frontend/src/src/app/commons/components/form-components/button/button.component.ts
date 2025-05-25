import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'a[appButton], button[appButton]',
  exportAs: 'appButton',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class AppButtonComponent {
  @Input() class = '';
  @Input() color = 'primary';

  @HostBinding('class') get className() {
    return this.class ? `btn btn-${this.color} ${this.class}` : `btn btn-${this.color}`;
  }
}
