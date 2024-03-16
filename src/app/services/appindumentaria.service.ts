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

  }

  getList():Observable<Producto[]>
  {
    return this.http.get<Producto[]>(this.apiUrl+'GetProducto');
  }

  addProducto(request:Producto):Observable<Producto>
  {
    return this.http.post<Producto>(this.apiUrl+'AddProducto',request);
  }

  putProducto(request:Producto):Observable<Producto>
  {
    return this.http.post<Producto>(this.apiUrl+'EditProducto',request);
  }

  

  deleteProducto(id:number):Observable<void>
  {
    return this.http.delete<void>(this.apiUrl+'DeleteProducto/'+id);
  }
}
