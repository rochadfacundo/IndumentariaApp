export class Producto {
    id: number;
    nombre:string;
    precio:number;
    path:string;


    constructor(id?:number)
    {
        if(id)
        this.id=id;
        else     
        this.id=0;
 
        this.precio=0;
        this.nombre="";
        this.path="";
    }

    aumentarPrecioProducto(porcentaje:number)
    {
        this.precio=this.precio+(this.precio*porcentaje);
    }

    descontarPrecioProducto(porcentaje:number)
    {
        this.precio=this.precio-(this.precio*porcentaje);
    }

}
