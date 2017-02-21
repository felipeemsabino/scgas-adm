import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../classes/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { URLSearchParams } from '@angular/http';

declare var $:any; // JQUERY

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  @Input()
  parametros: JSON;

  ativo: boolean; // apenas para controle do checkbox

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
  }

  setParametros() {
    // Controle necessário pois a propriedade ativo não é boolean, mas sim um 'S' ou 'N'
    this.parametros["entidadeUsuario"].ativo = ($('input[name="ativo"]:checked').length > 0 ? 'S' : 'N');
  }

  onSubmit() {
    this.setParametros();

    console.log('will submit2 -> ' + JSON.stringify(this.parametros["entidadeUsuario"]));
    let params: URLSearchParams = new URLSearchParams();
    params = this.parametros["entidadeUsuario"];
    // Salva usuario
    this.usuarioService.salvarUsuario(params)
                      .subscribe(
                          result => {
                            console.log('Salvou com sucesso!');
                          }, //Bind to view
                          err => {
                            console.log(err);
                          });
  }
}
