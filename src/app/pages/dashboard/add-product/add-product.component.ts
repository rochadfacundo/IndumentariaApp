import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../../classes/producto';
import { AppindumentariaService } from '../../../services/appindumentaria.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  emailFromLocalStorage: string|null=null;
  listProductos:Producto[]=[];
  formProducto:FormGroup;
  imagenBase64: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer,
              private _indumentariaService:AppindumentariaService,
              private fb:FormBuilder )
  {
    this.formProducto= this.fb.group({
      nombre:["",Validators.required],
      precio:["",Validators.required],
      imagen:["",Validators.required]
    });
  }


  addProducto()
  {
    const request:Producto=new Producto();

    request.nombre=this.formProducto.value.nombre;

    request.precio=this.formProducto.value.precio;

    request.path=this.formProducto.value.imagen;


    console.log(request);

    this._indumentariaService.addProducto(request).subscribe({
      next:(data)=>{
        this.listProductos.push(data);
        this.formProducto.patchValue({
          nombre:"",
          precio:0,
        });
      },error:(error)=>{
        console.log(error);
      }
    })
  }



  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result as string);
        this.formProducto.patchValue({
          imagen: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
