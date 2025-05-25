import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  ContentChild,
} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";

const ICON_BUTTON_CLASS = 'icon-btn';

@Component({
  selector: 'a[appIconButton], button[appIconButton]',
  exportAs: 'appIconButton',
  template: '<ng-content></ng-content>',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class AppIconButtonComponent {
  @Input() class = '';
  @ContentChild(FaIconComponent, { static: true }) icon!: FaIconComponent;

  @HostBinding('class') get className() {
    return this.class ? `${ICON_BUTTON_CLASS} ${this.class}` : ICON_BUTTON_CLASS;
  }
}
