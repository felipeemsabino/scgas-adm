export class Noticias {

  constructor(
    public id: number,
    public titulo: string,
    public textoNoticia: string,
    public dataCadastro?: Date
  ){}
}
