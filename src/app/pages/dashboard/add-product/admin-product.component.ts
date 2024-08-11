import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../../classes/producto';
import { AppindumentariaService } from '../../../services/appindumentaria.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastService } from '../../../services/toast.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule,ToastModule],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.css'
})
export class AdminProductComponent implements OnInit{
  emailFromLocalStorage: string|null=null;
  listProducts:Producto[]=[];
  formProduct:FormGroup;

  @Input() formEditProduct:boolean=false;
  @Input() formAddProduct:boolean=false;
  @Input() formDeleteProduct:boolean=false;
  @Input() productToEdit: Producto | null = null;
  @Input() productToDelete: Producto | null = null;

  @Output() cancelEvent= new EventEmitter<void>();

  constructor(private _indumentariaService:AppindumentariaService,
              public _toast:ToastService,
              private fb:FormBuilder )
  {
    this.formProduct= this.fb.group({
      nombre:["",Validators.required],
      precio:["",Validators.required],
      path:["",Validators.required]
    });
  }

  ngOnInit(): void {

      if(this.formEditProduct)
      {
        this.formProduct.patchValue({
          nombre: this.productToEdit?.nombre,
          precio: this.productToEdit?.precio,
          //path: this.productToEdit?.path
        });
      }else if(this.formDeleteProduct)
      {
        this.formProduct.patchValue({
          nombre: this.productToDelete?.nombre,
          precio: this.productToDelete?.precio,
          //path: this.productToEdit?.path
        });


        this.formProduct.controls["nombre"].disable();
        this.formProduct.controls["precio"].disable();
      }

  }

  editProduct()
  {
    const request:Producto=this.createProduct();

    this._indumentariaService.putProduct(request).subscribe({
      next:(data)=>{


          const index = this.listProducts.findIndex(p => p.id === data.id);

          // Si el producto existe, reemplázalo en la lista
          if (index !== -1) {
            this.listProducts[index] = data;
          }
          this.formProduct.patchValue({
            nombre:"",
            precio:0,
          });

          setTimeout(() => {


            this._toast.showSuccessToast("Producto modificado","El producto se modificó exitosamente!!")
          }, 2000);

            this.goLoadingBack();

      },error:(error)=>{
        console.log(error);
      }
    });
  }

  createProduct(): Producto {

    const request: Producto = new Producto();

    if (this.formEditProduct && this.productToEdit) {
      request.id = this.productToEdit.id;
    }

    request.nombre = this.formProduct.value.nombre;
    request.precio = this.formProduct.value.precio;
    request.path = this.formProduct.value.imagen || this.productToEdit?.path;

    return request;
  }


  addProduct()
  {
    const request:Producto=this.createProduct();

    this._indumentariaService.addProduct(request).subscribe({
      next:(data)=>{
        this.listProducts.push(data);
        this.formProduct.patchValue({
          nombre:"",
          precio:0,
        });

        setTimeout(() => {

          this._toast.showSuccessToast("Producto agregado","El producto se agregó exitosamente!!");

        }, 2000);
        this.goLoadingBack();

      },error:(error)=>{
        console.log(error);
      }
    });
  }

  deleteProduct()
  {
    const productDeleted:Producto=this.productToDelete!;

    this._indumentariaService.deleteProduct(productDeleted.id).subscribe({
      next:(data)=>{
       const newList= this.listProducts.filter(item=>item.id!=productDeleted.id);
       this.listProducts=newList;
       setTimeout(() => {
        this._toast.showSuccessToast("Producto eliminado","El producto se eliminó exitosamente!!")
      }, 2000);
      this.goLoadingBack();
      },error:(error)=>{
        console.log(error);
      }
    });
  }

  goBack()
  {
    this.cancelEvent.emit();
  }

  goLoadingBack()
  {
    setTimeout(() => {
      this.goBack();
    }, 5000);

  }



  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {

        this.formProduct.patchValue({
          path: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
