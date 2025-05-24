import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {catchError, first, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {TRANSLOCO_SCOPE, TranslocoService} from "@ngneat/transloco";
import {withLoader} from "../../commons/components/form-components/loader/with-loader.decorator";
import {AppToastrService} from "../../commons/components/form-components/toastr/app-toastr.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    if(this.authService.isLoggedIn) {
      this.router.navigateByUrl('/home')
    }
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
    this.form.controls.email.markAsDirty()
    this.form.controls.email.updateValueAndValidity();
    this.form.controls.password.markAsDirty();
    this.form.controls.password.updateValueAndValidity();
  }

}
