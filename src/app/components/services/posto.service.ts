import { Injectable } from '@angular/core';
import { Posto } from '../classes/posto';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostoService {
  url: string = 'http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/scgas/rest/postoservice/listaTodosPostos/';
  url2: string = 'http://192.168.184.115:8080/scgas/rest/postoservice/listaTodosPostos/';

  constructor(private http: Http) { }

  getPostos(params: URLSearchParams): Observable<Posto []> {

     return this.http.get(this.url,{ search: params })
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
