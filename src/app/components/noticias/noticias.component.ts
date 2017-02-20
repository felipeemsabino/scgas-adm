import { Component, OnInit } from '@angular/core';
import { Noticia } from '../classes/noticia';
import { NoticiaService } from '../services/noticia.service';
import { URLSearchParams, QueryEncoder, Http, Response } from '@angular/http';
import { NoticiaFormComponent } from './noticia-form/noticia-form.component';

declare var $:any; // JQUERY

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
  providers: [NoticiaService]
})
export class NoticiasComponent implements OnInit {

  params: URLSearchParams; // parametro que será enviado para a tela de manutenção

  // Parametros para pesquisa. Filtros e paginção
  dataCadastro: string;      //filtro de pesquisa
  inicio: number = 0;     //paginação
  intervalo: number = 10; //paginação
  paginaAtual: number = 1;//paginação
  retornoQtdRestante: number = 0; // quantos postos existem para serem mostrados em pesquisa

  // Array de notícias que será apresentado no grid
  noticias: Noticia[];

  // contem a notícia que está sendo editada/criada
  parametroFormulario = {};

  constructor(private http: Http, private postoService: NoticiaService) {
    this.params = new URLSearchParams();
    this.parametroFormulario["entidadeNoticia"] = new Noticia("", "", "S");
  }

  ngOnInit() {
    this.getNoticias();
  }

  /*
  * Recupera os postos para serem mostrados no grid
  */
  getNoticias() {
    this.setUrlParams();
    // Get all postos
    this.postoService.getNoticias(this.params)
                      .subscribe(
                          result => {
                            this.retornoQtdRestante = Number((<any>result.pop()).split(":")[1].replace("}",""));
                            this.noticias = result;
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
    this.params.set('dataCadastro', this.dataCadastro);
  }

  /* Método auxiliar da paginação.
  * Calcula a página atual que o usuário se encontra e a próxima página.
  */
  calculaRange(proximaPagina: number) {
    //console.log('Pagina atual -> ' + this.paginaAtual + ' Proxima pagina -> '+proximaPagina);

    this.inicio = (proximaPagina-1)*this.intervalo;
    this.paginaAtual = proximaPagina;
    this.getNoticias();
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
    * Antes de abrir a popup de manutenção de noticia esse método é acionado para construir a entiade
    * que a popup utilizará.
    */
    criaObjetoNoticia(noticia: any){

      // se edição, então preenche o atributo entidadeNoticia para enviar a tela de edição
      if(noticia !== undefined) {
        this.parametroFormulario["entidadeNoticia"] = new Noticia(noticia.titulo,
          noticia.textoNoticia, noticia.notifica, noticia.id, noticia.dataCadastro);
        console.log('editando posto -> '+JSON.stringify(noticia));
      } else { // se novo, então cria o atributo entidadeNoticia vazia para enviar a tela de edição
        this.parametroFormulario["entidadeNoticia"] = new Noticia("", "", "S");
        console.log('criando nova noticia');
      }
    }
}
