import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  ContentChild,
  ViewChild,
  Renderer2,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { AppInputComponent } from './input/input.component';
import { AppLabelComponent } from './label/label.component';
import { AppErrorComponent } from './error/error.component';
import {
  VERTICAL_LABEL_CLASS,
  WITH_LABEL_CLASS,
  INVALID_CLASS,
  APP_INPUT_WRAPPER_ACTIVE_CLASS,
  APP_FORM_FIELD_DISABLED_CLASS,
} from './classes';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class AppFormFieldComponent implements AfterContentInit, OnDestroy {
  private subscriptions = new Subscription();

  @Input() required = false;
  @Input() showErrors = true;
  @Input() upDescription: string | null = null;

  @ViewChild('formFieldWrapper', { static: true }) formFieldWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('appInputWrapper', { static: true }) appInputWrapper!: ElementRef<HTMLDivElement>;

  @ContentChild(AppInputComponent, { static: true }) input!: AppInputComponent;
  @ContentChild(AppLabelComponent, { static: true }) label!: AppLabelComponent;
  @ContentChildren(AppErrorComponent) errors!: QueryList<AppErrorComponent>;

  constructor(private renderer: Renderer2) {}

  ngAfterContentInit() {
    if (!this.input) {
      return;
    }

    this.setClassesToLabel();
    this.input.required = this.required;
    this.subscriptions.add(this.addValueChangesSub());
    this.subscriptions.add(this.addFocusOnInputSub());
    this.subscriptions.add(this.addFocusOutOnInputSub());
    this.subscriptions.add(this.addStatusChangeSub()!);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getTemplate(err: AppErrorComponent) {
    return err.template;
  }

  private setClassesToLabel() {
    if (this.label) {
      const formFieldWrapperElement = this.formFieldWrapper.nativeElement;
      if (this.label.vertical) {
        this.addClass(formFieldWrapperElement, VERTICAL_LABEL_CLASS);
      }
      this.addClass(formFieldWrapperElement, this.label ? WITH_LABEL_CLASS : '');

      this.label.required = this.required;
    }
  }

  private addValueChangesSub() {
    const { control } = this.input;
    if (!control) {
      return Subscription.EMPTY;
    }

    const appInputWrapperElement = this.appInputWrapper.nativeElement;
    return control.valueChanges!.subscribe((val: string) => {
      if (!control.errors || (!control.dirty && val === null)) {
        this.input.invalid = false;
        this.removeClass(appInputWrapperElement, INVALID_CLASS);

        return;
      }

      this.input.invalid = !!Object.keys(control.errors).length;
      this.addClass(appInputWrapperElement, INVALID_CLASS);
    });
  }

  private addFocusOnInputSub() {
    const el = this.appInputWrapper.nativeElement;
    return fromEvent(el, 'focusin').subscribe((event) => {
      this.addClass(el, APP_INPUT_WRAPPER_ACTIVE_CLASS);
    });
  }

  private addFocusOutOnInputSub() {
    const el = this.appInputWrapper.nativeElement;
    return fromEvent(el, 'focusout').subscribe((event) => {
      this.removeClass(el, APP_INPUT_WRAPPER_ACTIVE_CLASS);
    });
  }

  private addClass(el: HTMLElement, className: string) {
    this.renderer.addClass(el, className);
  }

  private removeClass(el: HTMLElement, className: string) {
    this.renderer.removeClass(el, className);
  }

  private addStatusChangeSub(): Subscription | void {
    if (!this.input || !this.input.control) {
      return Subscription.EMPTY;
    }

    this.input.control.control!.statusChanges.pipe(startWith(true)).subscribe(() => {
      if (this.input.control.disabled) {
        this.addClass(this.appInputWrapper.nativeElement, APP_FORM_FIELD_DISABLED_CLASS);
      } else {
        this.removeClass(this.appInputWrapper.nativeElement, APP_FORM_FIELD_DISABLED_CLASS);
      }
    });
  }
}
