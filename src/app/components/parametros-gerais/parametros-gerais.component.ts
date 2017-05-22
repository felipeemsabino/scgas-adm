import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { ParametrosGerais } from '../classes/parametrosGerais';
import { ParametrosgeraisService } from '../services/parametrosgerais.service';

declare var $:any; // JQUERY

@Component({
  selector: 'app-parametros-gerais',
  templateUrl: './parametros-gerais.component.html',
  styleUrls: ['./parametros-gerais.component.css'],
  providers: [ParametrosgeraisService]
})
export class ParametrosGeraisComponent implements OnInit {

  parametros = {};

  constructor(private parametrosGeraisService: ParametrosgeraisService) {
    this.parametros["parametrosGlobais"] = new ParametrosGerais(0, 0, 0);
  }

  ngOnInit() {
    this.getParametrosGerais();
  }

  getParametrosGerais() {
    this.parametrosGeraisService.getParametrosGerais()
                          .subscribe(
                              result => {
                                this.parametros["parametrosGlobais"] = result;
                                console.log('get  -> ' + JSON.stringify(this.parametros["parametrosGlobais"]));
                              }, //Bind to view
                              err => {
                                console.log(err);
                              });
  }

  onSubmit() {
    console.log('will submit2 -> ' + JSON.stringify(this.parametros["parametrosGlobais"]));
    let params: URLSearchParams = new URLSearchParams();
    params = this.parametros["parametrosGlobais"];

    // Salva parametros gerais
    this.parametrosGeraisService.salvarParametrosGerais(params)
                      .subscribe(
                          result => {
                            alert('Dados gravados com sucesso!');
                          }, //Bind to view
                          err => {
                            alert('Ocorreram erros ao gravar os dados! Tente novamente!');
                            console.log(err);
                          });
  }
}
