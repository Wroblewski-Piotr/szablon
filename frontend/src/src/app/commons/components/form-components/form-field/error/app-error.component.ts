import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

export const APP_ERROR_CLASS = 'app-error';

@Component({
  selector: 'app-error',
  templateUrl: './app-error.component.html',
  styleUrls: ['./app-error.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('visibilityChanged', [
      state('enter', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition('* => *', animate(ANIMATION_TIMINGS)),
    ]),
  ],
})
export class AppErrorComponent {
  readonly APP_ERROR_CLASS = APP_ERROR_CLASS;

  @Input() message = '';
  @Input() className?: string;

  @ViewChild('template', { static: true }) template!: TemplateRef<unknown>;
}
