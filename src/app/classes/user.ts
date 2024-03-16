import { EUser } from "../enums/euser";

export class User {

    id:number;
    email:string;
    password:string;
    path:string;
    dni:string;
    name:string;
    surName:string;
    age:number;
    address:string;
    city:string;
    country:string;
    nacionality:string;
    user:EUser;


    constructor()
    {
        this.id=0;
        this.user=EUser.Invitado;
        this.email="";
        this.password="";
        this.path="";
        this.dni="";
        this.name="";
        this.surName="";
        this.age=0;
        this.address="";
        this.city="";
        this.country="";
        this.nacionality="";
    }
}


