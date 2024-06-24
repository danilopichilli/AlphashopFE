export class Utente {
    username: string;
    password: string;
    email: string;
    nome: string;
    cognome: string;
    dob : Date;
  
    constructor(
      username: string,
      password: string,
      email: string,
      nome: string,
      cognome: string,
      dob : Date
    ) {
      this.username = username;
      this.password = password;
      this.email = email;
      this.nome = nome;
      this.cognome = cognome;
      this.dob = dob;
    }
  }
  