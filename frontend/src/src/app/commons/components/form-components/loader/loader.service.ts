import {Observable, Subject} from "rxjs";

export class LoaderService {
  private static onSubjectLoader = new Subject<boolean>();

  static onSetSubjectLoader(isLoading: boolean) {
    this.onSubjectLoader.next(isLoading);
  }

  static onGetSubjectLoader(): Observable<boolean> {
    return this.onSubjectLoader.asObservable();
  }
}
