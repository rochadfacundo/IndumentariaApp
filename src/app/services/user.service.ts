import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../classes/producto';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //apiUrl:string="https://www.indumentaria-api.somee.com/";
  apiUrl:string="https://localhost:7027/";

  constructor(private http: HttpClient) {
    this.apiUrl=this.apiUrl;

  }

  getListUsers():Observable<User[]>
  {
    return this.http.get<User[]>(this.apiUrl+'GetUsers');
  }

  /*
  getUserById(request:User):Observable<User>
  {
    return this.http.get<User>(this.apiUrl+'GetUsers',request);
  }*/


  addUser(request:User):Observable<User>
  {
    console.log(request);
    return this.http.post<User>(this.apiUrl+'AddUser',request);
  }

  editUser(request:User):Observable<User>
  {
    return this.http.put<User>(this.apiUrl+'EditUser',request);
  }

  deleteUser(id:number):Observable<void>
  {
    return this.http.delete<void>(this.apiUrl+'DeleteUser/'+id);
  }
}

