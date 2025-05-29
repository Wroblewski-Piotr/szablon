import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {combineLatest, debounceTime, filter, map} from 'rxjs';
import {
  GuardsCheckEnd, GuardsCheckStart,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router, RouterOutlet
} from "@angular/router";
import {AuthService} from "./auth/auth.service";
import { LoaderComponent } from "./commons/components/loader/loader.component";
import { AsyncPipe } from "@angular/common";
import { LoaderService } from "./commons/components/loader/loader.service";


const ZDARZENIA_AKTYWUJACE_LOADER = [NavigationStart, GuardsCheckEnd];
const ZDARZENIA_DEZAKTYWUJACE_LOADER = [NavigationCancel, NavigationEnd, NavigationError, GuardsCheckStart];
const ZDARZENIA_ZMIENIAJACE_STAN_LOADERA = [...ZDARZENIA_AKTYWUJACE_LOADER, ...ZDARZENIA_DEZAKTYWUJACE_LOADER];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterOutlet,
    LoaderComponent,
    AsyncPipe
  ]
})
export class AppComponent implements OnInit{
  readonly isLoading$ = this.onGetIsLoading$();

  constructor(private router: Router) {}

  ngOnInit() {
  }

  private onGetIsLoading$() {
    return combineLatest([
      this.router.events.pipe(
        filter(event => ZDARZENIA_ZMIENIAJACE_STAN_LOADERA.some(type => event instanceof type)),
        map(event => ZDARZENIA_AKTYWUJACE_LOADER.some(zdarzenie => event instanceof zdarzenie))
      ),
      LoaderService.onGetSubjectLoader()
    ]).pipe(
      debounceTime(0),
      map(result => result.some(Boolean))
    );
  }
}
