import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'a[appButton], button[appButton]',
  exportAs: 'appButton',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppButtonComponent {
  @Input() class = '';
  @Input() color = 'primary';

  @HostBinding('class') get className() {
    return this.class ? `btn btn-${this.color} ${this.class}` : `btn btn-${this.color}`;
  }
}
