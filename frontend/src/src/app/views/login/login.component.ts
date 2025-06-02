import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {catchError, first, of, tap} from "rxjs";
import { Router, RouterLink } from "@angular/router";
import { TRANSLOCO_SCOPE, TranslocoDirective, TranslocoService } from "@jsverse/transloco";
import {withLoader} from "../../commons/components/loader/with-loader.decorator";
import {AppToastrService} from "../../commons/toastr/app-toastr.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AppFormFieldComponent } from "../../commons/components/form-components/form-field/form-field.component";
import { AppInputComponent } from "../../commons/components/form-components/form-field/input/input.component";
import { AppButtonComponent } from "../../commons/components/form-components/button/button.component";
import { AppErrorComponent } from "../../commons/components/form-components/form-field/error/app-error.component";
import { AppLabelComponent } from "../../commons/components/form-components/form-field/label/app-label.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TranslocoDirective,
    ReactiveFormsModule,
    AppFormFieldComponent,
    AppErrorComponent,
    AppLabelComponent,
    AppInputComponent,
    AppButtonComponent,
    RouterLink
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'views/login',
        alias: 'login'
      }
    },
  ]
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private toastrService: AppToastrService,
              private authService: AuthService,
              private router: Router,
              private translocoService: TranslocoService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.invalid) {
      this.markAsDirty();
      return;
    }

    withLoader(this.authService.login(this.form.controls.email.value!, this.form.controls.password.value!))
      .pipe(
        first(),
        tap((response) => {
          this.router.navigate(['/home']);
        }),
        catchError(err => {
            this.toastrService.error(this.translocoService.translate('login.wrong-credential'))
            return of(null);
          }
        )
      )
      .subscribe();
  }

  private markAsDirty() {
    this.form.markAsDirty()
    this.form.updateValueAndValidity();
  }
}
