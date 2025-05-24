import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "../types/group.type";

@Injectable()
export class GroupsHttpService {

  constructor(private httpClient: HttpClient) { }

  public getGroups(): Observable<Group[]> {
    return this.httpClient.get<Group[]>('/api/v1/groups');
  }
}
