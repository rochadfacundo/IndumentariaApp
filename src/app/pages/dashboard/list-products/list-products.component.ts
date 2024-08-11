import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppindumentariaService } from '../../../services/appindumentaria.service';
import { Producto } from '../../../classes/producto';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit,OnDestroy{

  listProductos:Producto[]=[];
  delete:boolean=false;

  @Output() addProductEvent = new EventEmitter<boolean>();
  @Output() editProductEvent = new EventEmitter<Producto>();
  @Output() deleteProductEvent = new EventEmitter<Producto>();

  constructor(private _indumentariaService:AppindumentariaService

  ){}

  ngOnInit(): void {

    this.getProductos();
  }

  ngOnDestroy(): void {
    //desuscribir

  }

  getProductos()
  {
    this._indumentariaService.getList().subscribe({
      next:(data)=>{
       this.listProductos=data;
      },error:(error)=>{
        console.log(error);
      }
    });
  }

  addProducto()
  {
    this.addProductEvent.emit(true);
  }

  updateProducto(product:Producto)
  {
    this.editProductEvent.emit(product);
  }


  deleteProducto(product:Producto)
  {
    this.deleteProductEvent.emit(product);
  }

}
