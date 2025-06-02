import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SaveNewEventRequestType } from "../models/new-event.types";
import { Observable } from "rxjs";

@Injectable()
export class NewEventHttpService {

  constructor(private http: HttpClient) { }

  public saveNewEvent(request: SaveNewEventRequestType): Observable<void> {
    return this.http.post<void>("api/event", request);
  }
}
