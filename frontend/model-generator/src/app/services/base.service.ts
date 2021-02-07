import { Injectable, Injector } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { createDeepCopy } from '../functions/create-deep-copy';
import { map } from 'rxjs/operators';

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
        map((data: any) => {
          return type ? createDeepCopy(data, type) : data;
        })
      )
  }

  submitData(urlSuffix: string, obj: any) {
    const url = `${this.baseUrl}/${urlSuffix}`;
    return this.http.post(url, obj);
  }

  loadFile(urlSuffix: string, obj: any) {
    const url = `${this.baseUrl}/${urlSuffix}`;

    return this.http.post(url, obj, {responseType: 'blob' as 'json', observe: 'response'})
      .pipe(
        map((res: any) => {
          return {archive: res.body, filename: res.headers.get('Filename')}
        })
      )
  }

}
