import {
  Component,
  HostBinding,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { REQUIRED_CLASS, INVALID_CLASS, APP_FORM_CONTROL_CLASS } from '../classes';

@Component({
  selector: 'input[appInput], textarea[appInput]',
  exportAs: 'appInput',
  template: '<ng-content></ng-content>',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppInputComponent{
  private _required = false;

  @Input() class?: string;
  @Input() invalid = false;
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
    const isRequired = this._required ? REQUIRED_CLASS : '';
    const isInvalid = this.invalid ? INVALID_CLASS : '';

    return APP_FORM_CONTROL_CLASS + ' ' + [this.class, isRequired, isInvalid].join(' ');
  }

  constructor() {}
}
