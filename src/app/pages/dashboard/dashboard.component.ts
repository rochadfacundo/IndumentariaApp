import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../classes/producto';
import { AppindumentariaService } from '../../services/appindumentaria.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ListProductsComponent } from './list-products/list-products.component';
import { AdminProductComponent } from "./add-product/admin-product.component";
import { EUser } from '../../enums/euser';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent,CommonModule, ReactiveFormsModule, ListProductsComponent, AdminProductComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  roleFromLocalStorage!: EUser;
  emailFromLocalStorage: string|null=null;
  formEditProduct:boolean=false;
  formAddProduct:boolean=false;
  formDeleteProduct:boolean=false;
  productToEdit:Producto|null=null;
  productToDelete:Producto|null=null;
  userLog:User;

  constructor(private _user:UserService)
  {
    this.userLog=new User();
  }

  ngOnInit(): void {
    this.emailFromLocalStorage = localStorage.getItem('email');
    this.roleFromLocalStorage= <EUser> localStorage.getItem('user');
    this._user.getListUsers().subscribe((data)=>{

      const user= data.filter((user)=>this.emailFromLocalStorage==user.email);

      console.log(user);


    });
  }

  isAdmin(): boolean {
    return this.roleFromLocalStorage === EUser.Administrador;
  }

  isUser(): boolean {
      return this.roleFromLocalStorage === EUser.Usuario;
  }

  editProduct(event:Producto)
  {
    this.formEditProduct = true;
    this.productToEdit=event;
  }

  addProduct(event:boolean)
  {
    this.formAddProduct=event;
  }

  deleteProduct(event:Producto)
  {
    this.formDeleteProduct=true;
    this.productToDelete=event;
  }

  cancel()
  {
    this.formAddProduct=false;
    this.formEditProduct=false;
    this.formDeleteProduct=false;
  }

}

