export class Noticia {

  constructor(
    public titulo: string,
    public textoNoticia: string,
    public notifica?: string,
    public id?: number,
    public dataCadastro?: Date
  ){}
}
