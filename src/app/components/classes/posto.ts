export class Posto {

  constructor(
    public nome: string,
    public endereco: string,
    public coordenadaX: string,
    public coordenadaY: string,
    public numImovel: number,
    public ativo: string,
    public bandeiraPosto?: number,
    public id?: number,
    public dataCadastro?: Date,
    public listaPrecosGNV?: any
  ){}
}
