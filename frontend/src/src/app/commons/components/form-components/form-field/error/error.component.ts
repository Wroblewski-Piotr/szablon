import { Component, Input, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: [
    trigger('visibilityChanged', [
      state('enter', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition('* => *', animate(ANIMATION_TIMINGS)),
    ]),
  ],
})
export class AppErrorComponent {
  @Input() message = '';
  @ViewChild('template', { static: true }) template!: TemplateRef<any>;
}
