import { Component, OnInit } from '@angular/core';
import { URLSearchParams, QueryEncoder } from '@angular/http';
import { Http, Response } from '@angular/http';
import { PostoService } from '../services/posto.service';
import { Posto } from '../classes/posto';
declare var $:any;

@Component({
  selector: 'app-postos',
  templateUrl: './postos.component.html',
  styleUrls: ['./postos.component.css'],
  providers: [PostoService]
})

export class PostosComponent implements OnInit {

  params: URLSearchParams;
  nomePosto: string;
  bandeiraPosto: string;
  enderecoPosto: string;
  inicio: number = 0;
  intervalo: number = 10;
  paginaAtual: number = 1;
  postos: Posto[];

  // para retorno do serviço
  retornoQtdRestante: number = 0;
  contadorPaginas: number = 0;

  // entidade para edição ou criação
  entidadePosto: Posto;

  constructor(private http: Http, private postoService: PostoService) {
    this.params = new URLSearchParams();
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.getPostos();
  }

  getPostos() {
    this.setUrlParams();
    // Get all postos
    this.postoService.getPostos(this.params)
                      .subscribe(
                          result => {
                            this.retornoQtdRestante = Number((<any>result.pop()).split(":")[1].replace("}",""));
                            this.postos = result;
                          }, //Bind to view
                          err => {
                            console.log(err);
                          });
  }

  setUrlParams() {
    this.params.set('inicio', ""+this.inicio);
    this.params.set('fim', ""+this.intervalo);
    this.params.set('nomePosto', this.nomePosto);
    this.params.set('bandeiraPosto', this.bandeiraPosto);
    this.params.set('enderecoPosto', this.enderecoPosto);
  }


  calculaRange(proximaPagina: number) {
    console.log('Pagina atual -> ' + this.paginaAtual + ' Proxima pagina -> '+proximaPagina);

    this.inicio = (proximaPagina-1)*this.intervalo;
    this.paginaAtual = proximaPagina;
    this.getPostos();
  }

  createRange(){
    var items: number[] = [];
    if(this.retornoQtdRestante === undefined)
      return items;

    var paginas: number = Number((this.retornoQtdRestante/10).toFixed(0)); //10 items por pagina

    for(var i = 1; i <= paginas; i++){
       items.push(i);
    }
    return items;
  }

  /*getPostos() {
    this.setUrlParams();
    return this.http.get(
      '', {
      //search: this.params
    }).subscribe(
      (response) => this.onGetForecastResult(response),
      (error) => this.onGetForecastError(error),
      () => this.onGetForecastComplete()
    );
  }

  private onGetForecastResult(res: Response) {
      console.log('onGetForecastResult -> ' + res.json());
  }
  private onGetForecastError(error: Response | any) {
      console.log('onGetForecastError -> '+ error.json());
  }
  private onGetForecastComplete() {
    console.log('onGetForecastComplete');
  }*/
}
