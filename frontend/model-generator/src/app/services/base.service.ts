import { Injectable, Injector } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { createDeepCopy } from '../functions/create-deep-copy';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ErrorResponse } from '../classes/error-response';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private readonly baseUrl = 'api';
  private http: HttpClient;

  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  loadData(urlSuffix: string, type?: any) {
    const url = `${this.baseUrl}/${urlSuffix}`;
    return this.http.get(url)
      .pipe(
        catchError(err => throwError(new ErrorResponse(err.error))),
        map((data: any) => {
          return type ? createDeepCopy(data, type) : data;
        })
      )
  }

  submitData(urlSuffix: string, obj: any) {
    const url = `${this.baseUrl}/${urlSuffix}`;
    return this.http.post(url, obj)
      .pipe(
        catchError(err => throwError(new ErrorResponse(err.error)))
      )
  }

  loadFile(urlSuffix: string, obj: any) {
    const url = `${this.baseUrl}/${urlSuffix}`;

    return this.http.post(url, obj, {responseType: 'blob' as 'json', observe: 'response'})
      .pipe(
        catchError(err => { console.log(err); return throwError(new ErrorResponse(err.error))}),
        map((res: any) => {
          return {archive: res.body, filename: res.headers.get('Filename')}
        })
      )
  }

}
