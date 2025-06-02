import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NewEventHttpService } from "./services/new-event-http.service";
import { TRANSLOCO_SCOPE, TranslocoDirective } from "@jsverse/transloco";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AppButtonComponent } from "../../../../commons/components/form-components/button/button.component";
import { AppFormFieldComponent } from "../../../../commons/components/form-components/form-field/form-field.component";
import { AppInputComponent } from "../../../../commons/components/form-components/form-field/input/input.component";
import { withLoader } from "../../../../commons/components/loader/with-loader.decorator";
import { SaveNewEventRequestType } from "./models/new-event.types";
import { AppErrorComponent } from "../../../../commons/components/form-components/form-field/error/app-error.component";
import { AppLabelComponent } from "../../../../commons/components/form-components/form-field/label/app-label.component";
import {
  TerytAddressControlComponent
} from "../../../../commons/controls/teryt-address-control/teryt-address-control.component";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrl: './new-event.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslocoDirective,
    AppButtonComponent,
    AppErrorComponent,
    AppFormFieldComponent,
    AppInputComponent,
    AppLabelComponent,
    ReactiveFormsModule,
    TerytAddressControlComponent
  ],
  providers: [
    NewEventHttpService,
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'views/main/views/new-event',
        alias: 'new-event'
      }
    }
  ]
})
export class NewEventComponent {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', Validators.required)
  });

  constructor(private newEventHttpService: NewEventHttpService) {}

  onSubmit() {
    if (this.form.invalid) {
      this.markAsDirty();
      return;
    }

    let request: SaveNewEventRequestType = {
      name: this.form.controls.name.value!,
      description: this.form.controls.description.value!
    }
    withLoader(this.newEventHttpService.saveNewEvent(request)).subscribe();
  }

  private markAsDirty() {
    this.form.markAsDirty()
    this.form.updateValueAndValidity();
  }
}
