import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {LoaderService} from "./loader.service";
import {animate, style, transition, trigger} from "@angular/animations";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('loader', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class LoaderComponent implements OnDestroy {
  @Input() isLoading: boolean;

  onSubscriptionLoader: Subscription;

  constructor() {
    this.isLoading = false;
    this.onSubscriptionLoader = LoaderService.onGetSubjectLoader().subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    if (this.onSubscriptionLoader) {
      this.onSubscriptionLoader.unsubscribe();
    }
  }
}
