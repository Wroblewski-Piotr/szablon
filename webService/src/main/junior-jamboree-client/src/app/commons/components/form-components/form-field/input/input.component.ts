import {
  Component,
  HostBinding,
  Input,
  Optional,
  Self,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { REQUIRED_CLASS, INVALID_CLASS, APP_FORM_CONTROL_CLASS } from '../classes';

@Component({
  selector: 'input[appInput], textarea[appInput]',
  exportAs: 'appInput',
  template: '<ng-content></ng-content>',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppInputComponent {
  private _required = false;

  @Input() formControlName!: string;
  @Input() class = '';
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

  constructor(@Optional() @Self() private ngControl: NgControl) {}

  get control() {
    return this.ngControl;
  }
}
