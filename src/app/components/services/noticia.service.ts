import { Injectable } from '@angular/core';
import { Noticia } from '../classes/noticia';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as globals from '../globals';

@Injectable()
export class NoticiaService {

  constructor(private http: Http) { }

  getNoticias(params: URLSearchParams): Observable<Noticia []> {

     return this.http.get(globals.baseUrl+'noticiasservice/listaTodasNoticias/',{ search: params })
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  salvarNoticia(params: URLSearchParams): Observable<Noticia []> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

     return this.http.post(globals.baseUrl+'noticiasservice/cadastrarNoticias/', params , options)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

}
