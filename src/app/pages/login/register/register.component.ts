import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../services/spinner.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from '../../../services/interceptor.service';
import { CommonModule } from '@angular/common';
import { CountriesService } from '../../../services/countries.service';
import { Country } from '../../../interfaces/country';
import { User } from '../../../classes/user';
import { UserService } from '../../../services/user.service';
import { ToastService } from '../../../services/toast.service';
import { ToastModule } from 'primeng/toast';
import { ToastComponent } from '../../../components/toast/toast.component';
import { EUser } from '../../../enums/euser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,
            CommonModule,
            HttpClientModule,
            ToastModule,
            ToastComponent
          ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers:[
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}
  ]
})
export class RegisterComponent {
  registerForm!: FormGroup;
  listCountries!: Country[];
  user:User;
  file!:File;

  constructor(private router:Router,private spinner:SpinnerService,
              private _countries:CountriesService,
              private _userService:UserService,
              private _toastService:ToastService)
  {
    this.user=new User();

  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      path: new FormControl(''),
      dni: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      address: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      nacionality: new FormControl(''),
    });

    this._countries.getCountries().subscribe((data)=>{
      this.listCountries=data;

      console.log(this.listCountries);
    });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Guardar en localStorage
      localStorage.setItem('email', this.registerForm.get('email')?.value);
      localStorage.setItem('password', this.registerForm.get('password')?.value);
      this.spinner.show();


      this.user.name=this.registerForm.get('name')?.value;
      this.user.surName=this.registerForm.get('surName')?.value;
      this.user.dni=this.registerForm.get('dni')?.value;
      this.user.age=this.registerForm.get('age')?.value;
      this.user.city=this.registerForm.get('city')?.value;
      this.user.email=this.registerForm.get('email')?.value;
      this.user.password=this.registerForm.get('password')?.value;
      this.user.country=this.registerForm.get('country')?.value;
      this.user.role=EUser.Usuario;

      const pass2=this.registerForm.get('password2')?.value;

/*
      if(this.file)
      {

        // Convertir la imagen a Base64
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {

          this.user.path = reader.result as string;
        }
      }*/
      this.user.path ="";

      if(pass2!=this.user.password)
      {

        this._toastService.showErrorToast("Las contraseñas son distintas","Verifique que las contraseñas sean iguales");

      }else{
        this._userService.addUser(this.user).subscribe((user)=>{

          console.log(user);

          this._toastService.showSuccessToast("Usuario registrado","Se registró el usuario exitosamente");

          setTimeout(() => {
            this.router.navigateByUrl('pages/verification');
          }, 4000);

        });





      }
    } else {
      console.log('Formulario inválido');
    }
  }
}
