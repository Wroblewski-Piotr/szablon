import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private static onSubjectLoader = new Subject<boolean>();

  static onSetSubjectLoader(isLoading: boolean) {
    LoaderService.onSubjectLoader.next(isLoading);
  }

  static onGetSubjectLoader(): Observable<boolean> {
    return LoaderService.onSubjectLoader.asObservable();
  }
}
