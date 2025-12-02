import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';

export type Handler = {
  url: string,
  name: string,
}

export type HandlerWithId = Handler & {
  id: string
}


@Injectable({
  providedIn: 'root',
})
export class ResultServerService {

  private readonly httpClient = inject(HttpClient);

  getHandlers(): Observable<HandlerWithId[]> {
    return this.httpClient.get<Handler[]>('http://localhost:3000/handlers').pipe(
      map(handlers => [...handlers].map((val,idx) => ({
        ...val,
        id: `${idx}`
      })).reverse())
    );
  }

}
