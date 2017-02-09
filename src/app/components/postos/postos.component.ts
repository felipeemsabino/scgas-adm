import { Component, OnInit } from '@angular/core';
import { URLSearchParams, QueryEncoder } from '@angular/http';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-postos',
  templateUrl: './postos.component.html',
  styleUrls: ['./postos.component.css']
})

export class PostosComponent implements OnInit {

  params: URLSearchParams;
  nomePosto: string;
  bandeiraPosto: string;
  enderecoPosto: string;
  inicio: number = 1;
  fim: number = 10;
  intervalo: number = 10;
  paginaAtual: number = 1;

  constructor(private http: Http) {
    this.params = new URLSearchParams();
    this.setUrlParams();
  }

  ngOnInit() {
    //this.getPostos();
  }

  setUrlParams() {
    this.params.set('inicio', ""+this.inicio);
    this.params.set('fim', ""+this.fim);
    this.params.set('nomePosto', this.nomePosto);
    this.params.set('bandeiraPosto', this.bandeiraPosto);
    this.params.set('enderecoPosto', this.enderecoPosto);
  }

  getPostos() {
    this.setUrlParams();
    return this.http.get(
      'http://ec2-52-67-135-39.sa-east-1.compute.amazonaws.com:8080/postoservice/listaTodosPostos/', {
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
  }
  calculaRange(proximaPagina: number) {
    console.log('Pagina atual -> ' + this.paginaAtual + ' Proxima pagina -> '+proximaPagina);

    this.inicio = (proximaPagina-1)*this.intervalo+1;
    this.fim = this.inicio-1+this.intervalo;
    this.paginaAtual = proximaPagina;
    //this.getPostos();
  }
}
