import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {LoaderService} from "./loader.service";

export function withLoader<T>(observable: Observable<T>) {
  LoaderService.onSetSubjectLoader(true);
  return observable.pipe(finalize(() => LoaderService.onSetSubjectLoader(false)));
}
