import { Injectable } from '@angular/core';
import { Posto } from '../classes/posto';
import { Bandeira } from '../classes/bandeira';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as globals from '../globals';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostoService {
  // debugando local. ALterar ip se necessário
  //  url2: string = 'http://192.168.184.115:8080/scgas/rest/postoservice/listaTodosPostos/';

  constructor(private http: Http) { }

  getPostos(params: URLSearchParams): Observable<Posto []> {

     return this.http.get(globals.baseUrl+'listaTodosPostos/',{ search: params })
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  salvarPosto(params: URLSearchParams): Observable<Posto []> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

     return this.http.post(globals.baseUrl+'cadastrarPosto/', params , options)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  getBandeiras(): Observable<Bandeira []> {

     return this.http.get(globals.baseUrl+'listaBandeiras/')
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
