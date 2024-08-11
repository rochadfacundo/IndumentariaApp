import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../classes/producto';

@Injectable({
  providedIn: 'root',
})
export class AppindumentariaService {

  endPoint:string="https://www.indumentaria-api.somee.com/api/";
  apiUrl:string="Indumentaria/";


  constructor(private http: HttpClient) {
    this.apiUrl=this.endPoint+this.apiUrl;
    this.apiUrl=  "https://localhost:7027/api/Indumentaria/";

  }

  getList():Observable<Producto[]>
  {
    return this.http.get<Producto[]>(this.apiUrl+'GetProducto');
  }

  addProduct(request:Producto):Observable<Producto>
  {
    return this.http.post<Producto>(this.apiUrl+'AddProducto',request);
  }

  putProduct(request:Producto):Observable<Producto>
  {
    return this.http.put<Producto>(this.apiUrl+'EditProducto',request);
  }



  deleteProduct(id:number):Observable<void>
  {
    return this.http.delete<void>(this.apiUrl+'DeleteProducto/'+id);
  }
}
