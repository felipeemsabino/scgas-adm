import { Component, OnInit } from '@angular/core';
import { URLSearchParams, QueryEncoder } from '@angular/http';
import { Http, Response } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { PostoService } from '../services/posto.service';
import { Posto } from '../classes/posto';
import { Bandeira } from '../classes/bandeira';
import { PostoFormComponent } from './posto-form/posto-form.component';

declare var $:any; // JQUERY

@Component({
  selector: 'app-postos',
  templateUrl: './postos.component.html',
  styleUrls: ['./postos.component.css'],
  providers: [PostoService]
})

export class PostosComponent implements OnInit {

  params: URLSearchParams; // parametro que será enviado para a tela de manutenção

  // Parametros para pesquisa. Filtros e paginção
  nomePosto: string;      //filtro de pesquisa
  bandeiraPosto: string;  //filtro de pesquisa
  enderecoPosto: string;  //filtro de pesquisa
  inicio: number = 0;     //paginação
  intervalo: number = 10; //paginação
  paginaAtual: number = 1;//paginação
  retornoQtdRestante: number = 0; // quantos postos existem para serem mostrados em pesquisa

  // Array de postos que será apresentado no grid
  postos: Posto[];

  // contem o posto que está sendo editado/criado e as bandeiras disponíveis
  parametroFormulario = {};

  constructor(private http: Http, private postoService: PostoService) {
    this.params = new URLSearchParams();
    this.parametroFormulario["entidadePosto"] = new Posto("", "", "", "", 0, "S", 0);
  }

  ngOnInit() {
    this.getPostos();
    this.getBandeiras();
  }

  /*
  * Recupera as bandeiras para serem mostradas no select
  */
  getBandeiras() {
    // Get all bandeiras
    this.postoService.getBandeiras()
                      .subscribe(
                          result => {
                            this.parametroFormulario["bandeiras"] = result;
                          }, //Bind to view
                          err => {
                            console.log(err);
                          });
  }

  /*
  * Recupera os postos para serem mostrados no grid
  */
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

  /*
  * Monta os parametros que serão utilizados para buscar os postos
  */
  setUrlParams() {
    this.params = new URLSearchParams();
    this.params.set('inicio', ""+this.inicio);
    this.params.set('fim', ""+this.intervalo);
    this.params.set('nomePosto', this.nomePosto);
    this.params.set('bandeiraPosto', (this.bandeiraPosto != "_" ? this.bandeiraPosto : ""));
    this.params.set('enderecoPosto', this.enderecoPosto);
  }

  /* Método auxiliar da paginação.
  * Calcula a página atual que o usuário se encontra e a próxima página.
  */
  calculaRange(proximaPagina: number) {
    //console.log('Pagina atual -> ' + this.paginaAtual + ' Proxima pagina -> '+proximaPagina);

    this.inicio = (proximaPagina-1)*this.intervalo;
    this.paginaAtual = proximaPagina;
    this.getPostos();
  }

  /*
  * Calcula quantas páginas serão necessárias para mostrar todos os resultados da pesquisa.
  * Essa função é chamada diretamente no HTML para criar os números de paginção abaixo da tabela.
  */
  createRange(){
    var items: number[] = [];
    if(this.retornoQtdRestante === undefined)
      return items;

    var paginas: number = Number((this.retornoQtdRestante/10).toFixed(0)); //10 itens por pagina

    for(var i = 1; i <= paginas; i++){
       items.push(i);
    }
    return items;
  }

  /**
  * Antes de abrir a popup de manutenção de postos esse método é acionado para construir a entiade
  * que a popup utilizará.
  */
  criaObjetoPosto(posto: any){

    // se edição, então preenche o atributo entidadePosto para enviar a tela de edição
    if(posto !== undefined) {
      this.parametroFormulario["entidadePosto"] = new Posto(posto.nome, posto.endereco,
      posto.coordenadaX, posto.coordenadaY, posto.numImovel, posto.ativo, posto.bandeiraPosto.id,
      posto.id, posto.dataCadastro , posto.listaPrecosGNV);
      console.log('editando posto -> '+JSON.stringify(posto));
    } else { // se novo, então cria o atributo entidadePosto vazio para enviar a tela de edição
      this.parametroFormulario["entidadePosto"] = new Posto("", "", "", "", 0, "S", 0);
      console.log('criando novo posto');
    }
  }
}
