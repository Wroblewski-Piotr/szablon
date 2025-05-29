import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from "@angular/router";
import { APP_ROUTE_NAMES } from "../../app.route-names";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HomePageComponent {
  constructor(private router: Router,) {
  }

  goToLoginPage() {
    this.router.navigate([APP_ROUTE_NAMES.LOGIN]);
  }
}
