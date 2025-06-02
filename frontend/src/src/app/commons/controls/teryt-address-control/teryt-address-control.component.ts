import { Component, forwardRef, OnInit } from '@angular/core';
import { TRANSLOCO_SCOPE, TranslocoDirective } from "@jsverse/transloco";
import { AppErrorComponent } from "../../components/form-components/form-field/error/app-error.component";
import { AppFormFieldComponent } from "../../components/form-components/form-field/form-field.component";
import { AppLabelComponent } from "../../components/form-components/form-field/label/app-label.component";
import {
  ControlValueAccessor
  ,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule, Validators
} from "@angular/forms";
import { AutoComplete } from "primeng/autocomplete";
import {
  DaneAdresoweFormType,
  DaneAdresoweFormValue,
} from "./teryt-address-control.types";

@Component({
  selector: 'app-teryt-address-control',
  templateUrl: './teryt-address-control.component.html',
  styleUrl: './teryt-address-control.component.scss',
  standalone: true,
  imports: [
    AppErrorComponent,
    AppFormFieldComponent,
    AppLabelComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslocoDirective,
    AutoComplete
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'commons/controls/teryt-address-control',
        alias: 'address-control'
      }
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TerytAddressControlComponent),
      multi: true,
    },
  ]
})
export class TerytAddressControlComponent implements ControlValueAccessor, OnInit {
  form: FormGroup<DaneAdresoweFormValue>;

  wojewodztwa = [
    'Dolnośląskie', 'Kujawsko-pomorskie', 'Lubelskie', 'Lubuskie',
    'Łódzkie', 'Małopolskie', 'Mazowieckie', 'Opolskie', 'Podkarpackie',
    'Podlaskie', 'Pomorskie', 'Śląskie', 'Świętokrzyskie', 'Warmińsko-mazurskie',
    'Wielkopolskie', 'Zachodniopomorskie'
  ];

  private onChange = (value: DaneAdresoweFormType) => {};
  private onTouched = () => {};

  constructor() {
    this.form = new FormGroup<DaneAdresoweFormValue>({
      wojewodztwo: new FormControl(null, Validators.required),
      kodPocztowy: new FormControl(null, Validators.required),
      miejscowosc: new FormControl(null, Validators.required),
      ulica: new FormControl(null, Validators.required),
      numerBudynku: new FormControl(null, Validators.required),
      numerLokalu: new FormControl(null),
    });
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(value => console.log(value))
  }

  writeValue(value: DaneAdresoweFormType): void {
    if (value) this.form.patchValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: DaneAdresoweFormType) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
}
