export class Posto {

  constructor(
    public nome: string,
    public endereco: string,
    public coordenadaX: string,
    public coordenadaY: string,
    public numImovel: number,
    public ativo: boolean,
    public id?: number,
    public dataCadastro?: Date,
    public bandeiraPosto?: string,
    public listaPrecos?: number[]
  ){}
}
