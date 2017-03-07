import { Component, OnInit, Input } from '@angular/core';
import { Noticia } from '../../classes/noticia';
import { NoticiaService } from '../../services/noticia.service';
import { URLSearchParams } from '@angular/http';

declare var $:any; // JQUERY

@Component({
  selector: 'app-noticia-form',
  templateUrl: './noticia-form.component.html',
  styleUrls: ['./noticia-form.component.css']
})
export class NoticiaFormComponent implements OnInit {

  @Input()
  parametros: JSON;

  notifica: boolean; // apenas para controle do checkbox

  constructor(private noticiaService: NoticiaService) {}

  ngOnInit() {}

  setParametros() {
    // Controle necessário pois a propriedade ativo não é boolean, mas sim um 'S' ou 'N'
    this.parametros["entidadeNoticia"].notifica = ($('input[name="notifica"]:checked').length > 0 ? 'S' : 'N');
  }

  onSubmit() {
    this.setParametros();

    if (this.parametros["entidadeNoticia"].notifica == "S") {
      if(confirm("Ao salvar esse registro todos os usuários receberão uma notificação com essa notícia! Deseja prosseguir?") == false)
        return;
    }

    $('#myModal').modal('hide'); // fecha modal

    console.log('will submit2 -> ' + JSON.stringify(this.parametros["entidadeNoticia"]));
    let params: URLSearchParams = new URLSearchParams();
    params = this.parametros["entidadeNoticia"];
    // Salva posto
    this.noticiaService.salvarNoticia(params)
                      .subscribe(
                          result => {
                            alert('Dados gravados com sucesso!');
                            console.log('Salvou com sucesso!');
                            $('#recarregaGrid').click();
                          }, //Bind to view
                          err => {
                            alert('Ocorreram erros ao gravar os dados! Tente novamente!');
                            console.log(err);
                          });
  }

}
