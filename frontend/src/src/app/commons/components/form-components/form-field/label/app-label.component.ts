import { Input, HostBinding, Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';

export const REQUIRED_CLASS = 'required';
export const ONE_OF_REQUIRED_CLASS = 'one-of-required';
export const APP_FORM_FIELD_LABEL_CLASS = 'app-form-field-label';

@Component({
  selector: 'label[appLabel], span[appLabel], legend[appLabel], p[appLabel]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./app-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppLabelComponent {
  @Input() class?: string;
  @Input() required = false;
  @Input() oneOfRequired = false;

  @HostBinding('class') get className() {
    const isRequired = this.required ? REQUIRED_CLASS : '';
    const isOneOfRequired = this.oneOfRequired ? ONE_OF_REQUIRED_CLASS : '';

    return [APP_FORM_FIELD_LABEL_CLASS, isRequired, isOneOfRequired, this.class].filter(Boolean).join(' ');
  }

  constructor(public elementRef: ElementRef<HTMLLabelElement | HTMLSpanElement | HTMLLegendElement>) {}
}
