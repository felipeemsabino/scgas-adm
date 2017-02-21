import { Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as globals from '../globals';

@Injectable()
export class UsuarioService {

  constructor(private http: Http) { }

  getUsuarios(params: URLSearchParams): Observable<Usuario []> {

     return this.http.get(globals.baseUrl+'usuarioservice/listaUsuarios/',{ search: params })
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  salvarUsuario(params: URLSearchParams): Observable<Usuario []> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

     return this.http.post(globals.baseUrl+'usuarioservice/cadastrarUsuario/', params , options)
                     .map((res:Response) => res.json())
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }
}
