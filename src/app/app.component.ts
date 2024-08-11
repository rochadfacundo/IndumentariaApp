import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InterceptorService } from './services/interceptor.service';
import { ToastService } from './services/toast.service';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,
            CommonModule,
            RouterOutlet,
            ReactiveFormsModule,
            NgxSpinnerModule,
            ToastModule,
            ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}


  ]
})
export class AppComponent implements OnInit{
  title = 'App Indumentaria';

constructor(private router:Router,private _s:ToastService)
{

}

ngOnInit(){
  this.goToLogin();
}




goToLogin()
{

  this.router.navigateByUrl("pages/login");
}

}

