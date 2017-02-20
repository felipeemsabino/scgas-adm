export class Usuario {

  constructor(
    public id: number,
    public nome: string,
    public email: string,
    public senha: string,
    public pinSenha: string,
    public tokenFacebook: string,
    public tokenGmail: string,
    public tokenTwiter: string,
    public dataCadastro: Date,
    public ativo: string,
    public tokenNotificacao: string
  ){}
}
