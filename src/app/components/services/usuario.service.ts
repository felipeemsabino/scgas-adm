import { Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { Headers, Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as globals from '../globals';

@Injectable()
export class UsuarioService {

  constructor(private http: Http) { }

  getUsuarios(params: URLSearchParams): Observable<Usuario []> {
    this.loading(true);
     return this.http.get(globals.baseUrl+'usuarioservice/listaUsuarios/',{ search: params })
                     .map((res:Response) =>this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  salvarUsuario(params: URLSearchParams): Observable<Usuario []> {
    this.loading(true);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

     return this.http.post(globals.baseUrl+'usuarioservice/cadastrarusuario/', params , options)
                     .map((res:Response) => this.extractData(res))
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  extractData(res: Response) {
    this.loading(false);
    return res.json();
  }

  /*
  * Habilita e desabilita loading
  */
  loading(mostrar: boolean) {
    if(mostrar) {
      document.getElementById("loader").style.display = "block";
    } else {
      setTimeout(function () {
        document.getElementById("loader").style.display = "none";
      }, 500);
    }
  }
}
