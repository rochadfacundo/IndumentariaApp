import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InterceptorService } from '../../services/interceptor.service';
import { RegisterComponent } from './register/register.component';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { ToastCloseEvent, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule,
            ReactiveFormsModule,
            CommonModule,
            NgxSpinnerModule,
            RegisterComponent,
            ToastModule
          ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true},
  ]
})
export class LoginComponent implements OnInit  {

  loginForm!: FormGroup;
  listUsers!: User[];
  hiddenToast:boolean=true;

  toastEvent!:ToastCloseEvent;

  @Input() newUser:boolean;
  
  constructor(private router:Router,
              private spinner:SpinnerService,
              private _users:UserService,
              public _toast:ToastService) { 
    this.newUser=false;
  }

  onClose()
  {

  }

  ngOnInit(): void {
    this._users.getListUsers().subscribe((data)=>{

      this.listUsers=data;
      console.log(this.listUsers);
    });

    if(this.newUser)
    {


    }else
    {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      });
  
    }

  }

  registerUser()
  {
    this.router.navigateByUrl('pages/register');
  }

  onSubmit() {
    var email:string=this.loginForm.get('email')?.value;
    var password:string=this.loginForm.get('password')?.value;
    if (this.loginForm.valid) {
      // Guardar en localStorage
    
      localStorage.setItem('email', email);
      localStorage.setItem('password',password);


      var userLog=this.listUsers.filter((user)=>user.email==email&&user.password==password);
      console.log(userLog);
      setTimeout(() => {

        if(userLog)
        {
          this.router.navigateByUrl('pages/dashboard');
        }

      }, 3000);

  

    } else {
      console.log('Formulario inválido');
    }
  }

  showToast()
  {
    this._toast.hiddenToast=false;
    this._toast.showSuccessToast("titulo","contenido");
    setTimeout(() => {
      this._toast.hiddenToast=true;
    }, 3000);
    
    
   
  }

}
