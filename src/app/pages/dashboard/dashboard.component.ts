import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../classes/producto';
import { AppindumentariaService } from '../../services/appindumentaria.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ListProductsComponent } from './list-products/list-products.component';
import { AdminProductComponent } from "./add-product/admin-product.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ListProductsComponent, AdminProductComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  emailFromLocalStorage: string|null=null;
  formEditProduct:boolean=false;
  formAddProduct:boolean=false;
  formDeleteProduct:boolean=false;
  productToEdit:Producto|null=null;
  productToDelete:Producto|null=null;

  constructor()
  {

  }

  ngOnInit(): void {
    this.emailFromLocalStorage = localStorage.getItem('email');

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

