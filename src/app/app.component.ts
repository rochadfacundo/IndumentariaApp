import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InterceptorService } from './services/interceptor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule,
            CommonModule, 
            RouterOutlet,
            ReactiveFormsModule,
            NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}
  ]
})
export class AppComponent implements OnInit{
  title = 'AppIndumentaria';
  
constructor(private router:Router)
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

