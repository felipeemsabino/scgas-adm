import { Component, OnInit, Input } from '@angular/core';
import { Posto } from '../../classes/posto';
import { Bandeira } from '../../classes/bandeira';
import { PostoService } from '../../services/posto.service';
import { URLSearchParams } from '@angular/http';

declare var $:any; // JQUERY

@Component({
  selector: 'app-posto-form',
  templateUrl: './posto-form.component.html',
  styleUrls: ['./posto-form.component.css']
})
export class PostoFormComponent implements OnInit {

  @Input()
  parametros: JSON;

  ativo: boolean; // apenas para controle do checkbox

  constructor(private postoService: PostoService) {}

  ngOnInit() {}

  setBandeiraPosto(id: number) {
    let bandeiras: Bandeira[] = this.parametros["bandeiras"];
    for (let bandeira of bandeiras) {
      if(bandeira.id == id)
        return bandeira;
    }
  }

  setParametros() {
    let idBandeira: number = this.parametros["entidadePosto"].bandeiraPosto;
    this.parametros["entidadePosto"].bandeiraPosto = this.setBandeiraPosto(idBandeira);

    // Controle necessário pois a propriedade ativo não é boolean, mas sim um 'S' ou 'N'
    this.parametros["entidadePosto"].ativo = ($('input[name="ativo"]:checked').length > 0 ? 'S' : 'N');
  }
  onSubmit() {
    this.setParametros();

    console.log('will submit2 -> ' + JSON.stringify(this.parametros["entidadePosto"]));
    let params: URLSearchParams = new URLSearchParams();
    params = this.parametros["entidadePosto"];
    // Salva posto
    this.postoService.salvarPosto(params)
                      .subscribe(
                          result => {
                            console.log('Salvou com sucesso!');
                          }, //Bind to view
                          err => {
                            console.log(err);
                          });
  }

}