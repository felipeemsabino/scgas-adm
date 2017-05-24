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

  excluirUsuario() {
    var r = confirm("Tem certeza que deseja cancelar esse registro?");
    if (r == true) {
      this.parametros["entidadeUsuario"].excluido = 'S';
      this.onSubmit();
    } else {
        return;
    }
  }

  onSubmit() {
    $('#myModal').modal('hide'); // fecha modal
    this.setParametros();

    console.log('will submit2 -> ' + JSON.stringify(this.parametros["entidadeUsuario"]));
    let params: URLSearchParams = new URLSearchParams();
    params = this.parametros["entidadeUsuario"];
    // Salva usuario
    this.usuarioService.salvarUsuario(params)
                      .subscribe(
                          result => {
                            alert('Dados gravados com sucesso!');
                            $('#recarregaGrid').click();
                          }, //Bind to view
                          err => {
                            alert('Ocorreram erros ao gravar os dados! Tente novamente!');
                            console.log(err);
                          });
  }
}
