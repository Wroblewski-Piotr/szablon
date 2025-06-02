import {
  Component,
  Input,
  ContentChild,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  ChangeDetectorRef,
  OnInit, ChangeDetectionStrategy,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgTemplateOutlet, SlicePipe } from "@angular/common";
import { AppErrorComponent } from "./error/app-error.component";

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgTemplateOutlet,
    SlicePipe
  ]
})
export class AppFormFieldComponent implements OnInit, AfterContentInit, OnDestroy {
  private subscriptions = new Subscription();

  readonly APP_FORM_FIELD_WRAPPER_CLASS = "app-form-field-wrapper";
  readonly APP_INPUT_ERRORS_WRAPPER_CLASS = "app-input-errors-wrapper";
  readonly APP_INPUT_WRAPPER_CLASS = "app-input-wrapper";
  readonly APP_ERRORS_CONTAINER_CLASS = "app-errors-container";

  @Input() required = false;
  @Input() showErrors = true;

  @Input() wrapperClass?: string;
  @Input() inputErrorsWrapperClass?: string;
  @Input() inputWrapperClass?: string;
  @Input() errorsContainerClass?: string;

  @ContentChild(NgControl, { static: true }) ngControl?: NgControl;
  @ContentChildren(AppErrorComponent) errors!: QueryList<AppErrorComponent>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  get control() {
    return this.ngControl?.control;
  }

  ngOnInit() {
    if (!this.ngControl) {
      console.warn('AppFormFieldComponent should contain a component with a ValueAccessor.');
    }
  }

  ngAfterContentInit() {
    this.subscriptions.add(this.errors.changes.subscribe(() => this.changeDetectorRef.markForCheck()));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
