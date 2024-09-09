export class User{

  constructor(
    public email:string,
    public id:string,
    private token:string,
    private expirein:Date
  ){


  }

  get tokens(){
    if(!this.expirein ||  this.expirein < new Date()){
      return null

    }
    return this.token
  }


}
