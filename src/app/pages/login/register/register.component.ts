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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
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

  constructor(private router:Router,private spinner:SpinnerService,
              private _countries:CountriesService,
              private _userService:UserService) 
  {
    this.user=new User();
    
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      path: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      nacionality: new FormControl('', Validators.required),
    });

    this._countries.getCountries().subscribe((data)=>{
      this.listCountries=data;

      console.log(this.listCountries);
    });
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
      this.user.path=this.registerForm.get('path')?.value;
      this.user.country=this.registerForm.get('country')?.value;


      this._userService.addUser(this.user);

      setTimeout(() => {
        
        this.router.navigateByUrl('pages/login');
      }, 3000);

  

    } else {
      console.log('Formulario inválido');
    }
  }
}
