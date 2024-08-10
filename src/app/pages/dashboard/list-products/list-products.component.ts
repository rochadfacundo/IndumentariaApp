import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor(private _indumentariaService:AppindumentariaService

  ){

  }

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
    })
  }


  deleteProducto(producto:Producto)
  {
    this._indumentariaService.deleteProducto(producto.id).subscribe({
      next:(data)=>{
       const newList= this.listProductos.filter(item=>item.id!=producto.id);
       this.listProductos=newList;
      },error:(error)=>{
        console.log(error);
      }
    })
  }

}
