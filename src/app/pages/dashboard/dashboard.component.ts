import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../classes/producto';
import { AppindumentariaService } from '../../services/appindumentaria.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddProductComponent } from "./add-product/add-product.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ListProductsComponent, AddProductComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  emailFromLocalStorage: string|null=null;

  constructor()
  {

  }

  ngOnInit(): void {
    this.emailFromLocalStorage = localStorage.getItem('email');

  }



}

