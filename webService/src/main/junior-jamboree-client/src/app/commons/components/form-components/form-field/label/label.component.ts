import { Input, HostBinding, Component, ChangeDetectionStrategy } from '@angular/core';
import {
  VERTICAL_CLASS,
  REQUIRED_CLASS,
  APP_FORM_FIELD_LABEL_CLASS,
  TWO_ASTERISK_CLASS,
} from '../classes';

@Component({
  selector: 'label[appLabel], span[appLabel]',
  exportAs: 'appLabel',
  template: '<ng-content></ng-content>',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLabelComponent {
  private _required = false;

  @Input() vertical = false;
  @Input() class = '';
  @Input() twoAsterisk = false;
  @Input()
  get required() {
    return this._required;
  }
  set required(val: boolean) {
    if (!this._required) {
      this._required = val;
    }
  }

  @HostBinding('class') get className() {
    const isVertical = this.vertical ? VERTICAL_CLASS : '';
    const isRequired = this._required ? REQUIRED_CLASS : '';
    const isTwoAsterisk = this.twoAsterisk ? TWO_ASTERISK_CLASS : '';

    return (
      APP_FORM_FIELD_LABEL_CLASS +
      ' ' +
      [isVertical, isRequired, isTwoAsterisk, this.class].join(' ')
    );
  }
}
