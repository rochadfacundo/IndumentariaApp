import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../classes/producto';
import { AppindumentariaService } from '../../services/appindumentaria.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

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


  ngOnInit(): void {
    this.emailFromLocalStorage = localStorage.getItem('email');
    this.getProductos();
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

