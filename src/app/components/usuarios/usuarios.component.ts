import { Component, OnInit } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { URLSearchParams, QueryEncoder, Http, Response } from '@angular/http';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {

  params: URLSearchParams; // parametro que será enviado para a tela de manutenção

  // Parametros para pesquisa. Filtros e paginção
  nome: string;      //filtro de pesquisa
  email: string;      //filtro de pesquisa
  inicio: number = 0;     //paginação
  intervalo: number = 10; //paginação
  paginaAtual: number = 1;//paginação
  retornoQtdRestante: number = 0; // quantos usuarios existem para serem mostrados em pesquisa

  // Array de usuarios que será apresentado no grid
  usuarios: Usuario[];

  // contem o usuario que está sendo editada
  parametroFormulario = {};

  constructor(private http: Http, private usuarioService: UsuarioService) {
    this.params = new URLSearchParams();
    this.parametroFormulario["entidadeUsuario"] = new Usuario(0, "", "", "", "", "", "", "", new Date(), "N","");
  }

  ngOnInit() {
    this.getUsuarios();
  }

  /*
  * Recupera os usuarios para serem mostrados no grid
  */
  getUsuarios() {
    this.setUrlParams();
    // Get all usuarios
    this.usuarioService.getUsuarios(this.params)
                      .subscribe(
                          result => {
                            this.retornoQtdRestante = Number((<any>result.pop()).split(":")[1].replace("}",""));
                            this.usuarios = result;
                          }, //Bind to view
                          err => {
                            console.log(err);
                          });
  }

  /*
  * Monta os parametros que serão utilizados para buscar os usuarios
  */
  setUrlParams() {
    this.params = new URLSearchParams();
    this.params.set('inicio', ""+this.inicio);
    this.params.set('fim', ""+this.intervalo);
    this.params.set('nome', this.nome);
    this.params.set('email', this.email);
  }

  /* Método auxiliar da paginação.
  * Calcula a página atual que o usuário se encontra e a próxima página.
  */
  calculaRange(proximaPagina: number) {
    //console.log('Pagina atual -> ' + this.paginaAtual + ' Proxima pagina -> '+proximaPagina);

    this.inicio = (proximaPagina-1)*this.intervalo;
    this.paginaAtual = proximaPagina;
    this.getUsuarios();
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
    * Antes de abrir a popup de manutenção de usuario esse método é acionado para construir a entiade
    * que a popup utilizará.
    */
    criaObjetoUsuario(usuario: any) {

      // Edição, então preenche o atributo entidadeUsuario para enviar a tela de edição
      if(usuario !== undefined) {
        this.parametroFormulario["entidadeUsuario"] = new Usuario(usuario.id,
          usuario.nome, usuario.email, usuario.senha, usuario.pinSenha,
          usuario.tokenFacebook, usuario.tokenGmail, usuario.tokenTwiter,
          usuario.dataCadastro, usuario.ativo, usuario.tokenNotificacao);
        console.log('editando usuario -> '+JSON.stringify(usuario));
      }
    }

    /*
    * Quando o usuário clica em pesquisar é necessário buscar os resultados
    * a partir da primeira página.
    */
    getUsuariosComFiltro () {
      this.calculaRange(1);
    }
}
